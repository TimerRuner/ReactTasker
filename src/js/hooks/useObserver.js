import { useEffect, useRef } from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef()
  useEffect(() => {
    if(isLoading) return;
    if(observer.current) observer.current.disconnect(); //

    var cb = function(entries, observer) {
       if(entries[0].isIntersecting && canLoad) { //Спрацює лише коли потоне знач сторінки менше ніж їх загальна кількість
        callback()
       }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current)
  }, [isLoading])
}