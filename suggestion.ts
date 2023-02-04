const loadingPromises: Promise<void>[] = [];

for await (const entry of walk(postsDirectory)) {
  if (entry.isFile && entry.path.endsWith(".md")) {

    loadingPromises.push(loadPost(postsDirectory, entry.path));
    
  }
}

await Promise.all(loadingPromises);