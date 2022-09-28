---
title:  "A Very Wordpress Wednesday"
tags: [ legacy, web, performance ]
publish_date: 2020-03-25
---

Yesterday evening I took a conference call with a client who needed some work done in a WordPress site she was building. Wordpress is such a large and well developed entity, but I've avoided it for a long time due to it's substantial attack surface, lack of native scalability, and the way I end up getting sucked into dealing with nit-picky backend issues rather than client experience. 

This morning, I decided to grab a cup of coffee and a maple donut, and delve into the Wordpress ecology for a while.

## Installation 

I already had Docker installed (**brew cask install docker** for those of you who don't yet) and generally prefer avoiding strewing test software all over my machine, so, using these [great instructions](https://upcloud.com/community/tutorials/wordpress-with-docker/), I fired up a WordPress and MariaDB instance à la:

```bash
docker run -e MYSQL_ROOT_PASSWORD=<password> -e MYSQL_DATABASE=wordpress --name wordpressdb -v "$PWD/database":/var/lib/mysql -d mariadb:latest
```

```bash
docker run -e WORDPRESS_DB_PASSWORD=<password> --name wordpress --link wordpressdb:mysql -p 80:80 -v "$PWD/html":/var/www/html -d wordpress
```

This gave me a live development instance of *the Press*. So, reason one I already don't like WordPress: I had to use my desktop to deal with it. Ugh. (In fairness to WordPress proponents, I could have done this in the cloud, albeit probably at some cost.)

> I could have done this in the cloud.


Logging in to the local site, there was no way to access the templating in browser. I guess that's common for a CMS, but I feel like if I can't do everything (content and rendering) all in one convenient editor, what's the point? Starting with a great theme is awesome, but if you don't want your site to feel cookie cutter, you're going to need to get into the classes and html it's using. Period.

## Testing

Once you get used to a git based workflow, it's hard to imagine going back to the process of testing changes on a live site. Even when you make a development version, you're still dealing with changes pulled from the database that can surprise. Most production environments will (hopefully!) have their database obscured from public accessibility, and opening it up to be able to run tests with a developer copy could prove to be a security nightmare. 

Split testing gets a lot more complex as well as you have to configure a load balancer between multiple instances. Ugh.


## Markdown

Getting markdown turned on was counterintuitive. It wasn't where I expected to find it in the settings, and although it was supposed to be on already, didn't seem to work? I also drastically prefer kramdown (so I can tidily add classes to images/pull quotes/whatever) and I don't think it's possible to use it with the Press. Bummer.

> Convesio has created a great Docker based WordPress hosting system.


## Hosting

The brightest light in my WordPress exploration was the hosting side. Scalability is a real concern with older LAMP sites and if you don't think about it from the beginning, you may miss out on a powerful wave of traffic, leaving your potential user base with a bad taste in their mouths to boot. For those not inclined to containerize their infrastructure on AWS themselves, [Convesio](https://convesio.com/) has created a great Docker based WordPress hosting system that addresses some of these issues. They're young and growing, so some parts of their system feel a little unfinished, but they have the idea right and are working fast. For docker based WP hosting with really reasonable serve times at reasonable prices (the [starter plan](https://convesio.com/monthly-pricing/) is $15/month. Speed testing some of their featured sites didn't turn out as well as I had hoped, but in fairness the speed failures were predominantly due to poorly configured (and rectifiable) settings in individual WordPress installations and not the hosting itself.

## The Takeaway Numbers

WordPress is still huge on the web. I see widely varying numbers of the sites powered by it, but it's a substantial portion. Maybe 1 out of 5? Maybe 2 out of 5? Additionally, lots of new sites continue to choose WordPress, so being familiar with it is a must. Like any paradigm, it boils down largely to the ins and outs of its package ecology. Can you find (or have built) the packages you need to build the product you're trying to create? And can you configure the packages you need to make sure you site remains competitive in the performant web? 


