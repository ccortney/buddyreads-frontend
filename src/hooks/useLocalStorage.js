import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates `item` as state and look in localStorage for current value
 * (if not found, defaults to `defaultValue`)
 *
 * When `item` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 */

const useLocalStorage = (key, defaultValue = null) => {
    const initialValue = localStorage.getItem(key) || defaultValue;

    const [item, setItem] = useState(initialValue);

    useEffect(() => {
        // console.debug("hooks useLocalStorage useEffect", "item=", item);

        if (item === null) localStorage.removeItem(key);
        else localStorage.setItem(key, item);
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;