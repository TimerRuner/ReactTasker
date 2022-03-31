import { useEffect, useRef } from "react"

export default function useScroll(parentRef, childRef, callback){
  const observer = useRef()

  useEffect(() => {
    const options = {
      root: parentRef.current, //! 
      rootMargin: '0px',
      threshold: 0 //! callback спрацює, як тільки ми дійдемо до елемента parentRef
    }
    observer.current = new IntersectionObserver(([target]) => {
      if(target.isIntersecting){
        callback()
      }
    }, options)

    observer.current.observe(childRef.current) //! наблюдаємо за дочірнім елементом

    return () => {
      observer.current.unobserve(childRef.current)
    }
  }, [callback])
}