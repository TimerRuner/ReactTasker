import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if(sort) {
      //! Так як sort мутує поточний масив, то ми операцію продимо із копією, localCompare працює при сортуванні строк
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
    }

    return posts;
  }, [sort, posts]);

  return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)

    //! Так як для реалізації пошуку потрбно мати відсортовану копію масива постів, ми використовуємо sortPosts
    const sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}