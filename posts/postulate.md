---
title:  "Legacy CMS Test Environments"
tags: [ legacy, web, performance ]
publish_date: 2020-04-20
---

Especially since the advent of HTTP2, more and more people have been turning their focus to the *performant web*, the world of the internet that allows pages to feel instantaneous. There's a lot of reason behind this. The numbers vary study by study but the trend is obvious: your users are bouncing, perhaps exponentially, as your page load time increases. Much like the Erie Canal shifted the trade of the Mississippi Valley away from New Orleans (the wealthiest metropolis in the country at the time) to New York, trends in web technology can reroute commerce in the push of a repository. 

So, I decided to get down into the nitty gritty last week and explore some facets of the slower, older side of the web. 

> "Oh what a tangled web we weave..."


## Shuffling the Stack

I do not need to dig a computer out of the closet and go through provisioning it to do testing, especially when part of what I want to be able to easily test is varying software versions in a real-to-semi-real world environment. I also don't care to deal with SSL cert provisioning for test units.

So I shuffled the LAMP paradigm and came up with a DPMC situation. 

## Docker

For portability, scalability, and general ease, I substituted Docker for Linux. This came with a few issues. Most (all?) LAMP CMS vanilla Docker images come configured to serve over only HTTP/1.1. Serving over HTTP/2 involves installing php-fpm and reconfiguring Apache, but installing php-fpm in an otherwise preconfigured container is a bit of an ordeal. This *still* doesn't get SSL configured. Most LAMP CMS's do have a php-fpm version on Docker, so, step 2....

## Caddy

I ditched Apache. Who wants a patchy web server anyway? 

> Configuring Caddy is like a full mani-pedi.


[Caddy](https://caddyserver.com) is a fantastic young web server that just hit 2.0. (Well, it's in pre-release at the time of this writing, but who's counting?) If configuring Apache is like having pieces of bamboo shoved under your fingernails, configuring Caddy is more like a full mani-pedi.

### SSL

As long as Caddy has access to ports 80 and 443, it will automatically provision your SSL certificates. This makes life testing many versions of different containers really friction free. 

### H2: So You Can Be a Performant Hedgehog

HTTP/2 was implemented roughly 5 years ago, but tons of older sites have yet to implement it. This makes sense as a lot of people and smaller companies want to pay a web person once to set things up, and then defer to the host without ever considering updating their infrastructure. It's a question of how can you be expected to know what you don't know?

If you want the nitty on HTTP/2, Daniel Stenberg's [http2 explained](https://daniel.haxx.se/http2/) is worth a perusal. (He also has a good read on HTTP/3: [HTTP/3 Explained](https://daniel.haxx.se/http3-explained/).) 

Caddy can serve over HTTP/1.1, HTTP/2 & TLS and HTTP/2 & clear text. This is awesome for profiling overheads from different configurations, and switching couldn't be easier. 

### FastCGI 

Caddy gets FastCGI and can work with PHP-FPM.

## The Database

Perhaps the most standard element of the paradigm, I was able to use a MariaDB container for the MySQL database. 

## PHP

As I began to mention earlier, getting the PHP parts to work with HTTP/2 involved leaving the PHP-CGI of the vanilla containers and going to PHP-FPM FastCGI. This alone can be an upwards of 300% performance gain, so trying to have any meaningful test in a vanilla container (e.g. without it) would be pretty meaningless.

PHP has grown far faster through the years, at least according to this graphic courtesy of Kinsta:

![PHP Benchmarks](https://kinsta.com/wp-content/uploads/2020/01/wordpress-5-3-php-benchmarks.png#wide)

PHP Benchmarks courtesy of [Kinsta](https://kinsta.com/blog/php-benchmarks/)


As you can see above, it's well worth finding the lastest version of PHP a site can support.

## Orchestration

So, I probably should have done it all in a Docker compose, command, but while I was busy testing and editing, I just used the following steps. You'll want to forward ports 80 and 443 from your router through to your Docker box for SSL to work.

### Bringing up the Database

Not a production config, but this did the trick for testing:

```bash
docker run -e MYSQL_ROOT_PASSWORD=supersecretpassword -e MYSQL_DATABASE=joomla --name joomladb -v "$PWD/database":/var/lib/mysql:cached -d mariadb:latest 
```

### Joomla

Next we want to bring up the PHP-FPM layer, in this case Joomla using php7.4:

```bash
docker run -e JOOMLA_DB_PASSWORD=supersecretpassword --name joomla --link joomladb:mysql -v "$PWD/html":/var/www/html -d joomla:php7.4-fpm
```

### Four!

Now we want to serve the static files and PHP-FPM content with Caddy, which will also manage our SSL.

```bash
docker create -d -v $PWD/.caddy:/data -v $PWD/.config:/config -p 80:80 -p 443:443 --name caddy -v $PWD/html:/var/www/html --link joomla caddy/caddy
```

To function externally, assign a subdomain in your name server and point it at your Docker box. Caddy also needs a few customizations on it's config file (a Caddyfile in the lingo).

I used a Caddyfile with the below content:

```bash
joomla.yourdomain.com
root * /var/www/html
file_server
try_files {path} {path}/index.php /index.php?{query}&p={path}
php_fastcgi joomla:9000
encode gzip
log stdout 
```

Then, copied it into the Caddy container using:

```bash
docker cp Caddyfile caddy:/etc/Caddy/Caddyfile
```

And start the container with:

```bash
docker start caddy
```

At this point, you should be able to look in the container logs of the three containers, and see that the database has started, that Joomla has made a default install, and that Caddy has negotiated its SSL certs.

## Speed: So Your Content Has a Chance to Matter

So straight out of the box, severing with Caddy HTTP/2 and php-fpm7.4 (the latest and allegedly way fastest version of php-fpm), the default Joomla install scored a PageSpeed Insight of 46/84 (Mobile/Desktop). Adding **gzip** to Caddy pulled the score up to 87/93. 

I was dissatisfied. The default install has basically nothing on the site, so why should it be so slow. 

So, I put a file in the root directory titled test.php with the following content:

```php
<?php phpinfo(); ?>
```

That page scored a 100/100 PageSpeed score. Which was fascinating. I had been assuming that the slow scores were a PHP thing, but ne-ne fluffy. The PHP test page ran super fast. It was touching the database that was slowing things down.

>You don't have to be faster than the bear, you just have to be faster than the slowest guy running from it.


It turns out that there are three options providing different ways in which Docker can mount a volume: *consistent*, *cached*, and *delegated*. 

*Consistent* volume mounts make sure that any changes reflected in the underlying file system stay in sync with the Docker volume *and* that and changes reflected in the Docker volume stay in sync with the underlying file system.

*Cached* volumes require all changes in the Docker volume stay in sync to the file system (you won't lose a write due to a power failure), but doesn't worry about continuously reading the underlying file system (aka, your container is the only one making changes to the DB files).

*Delegated* allows both the reads and writes of the Docker volume to become inconsistent with the underlying file system. This is appropriate for ephemeral data that doesn't need to be constantly in sync.

Adding the **:cached** option to our DB volume mount sped things up significantly, producing a 90/95 PageSpeed score. Adding a some minification brought the score up to a 97/100.

Of course, once you start adding browser cacheing, things can get, well, weird, in regard to testing. Most of my subsequent scores became meaningless. I would have needed to change my subdomain. This highlights the value of appropriate staging environments for tests of this sort. When your provider gives you a separate subdomain for every build, they're not just making your life easy, they're also ensuring that your cache is invalidated so you can have a clean load of your changes.


## Broad Opportunities

There's a lot more work to do around here creating larger, more diverse tests. But, early tests indicate that it's not so much the CMS that determines performance as it is the person configuring it. This is great news for companies who have invested a lot of time in building their site databases through the years and aren't ready to abandon ship, despite their performance crawling.
