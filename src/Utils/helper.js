export const getTime = () => {
    return new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
}

export const secToTimer = (sec) => {
    const h = Math.floor(sec / 3600) < 10 ? `0${Math.floor(sec / 3600)}` : Math.floor(sec / 3600);
    const m = Math.floor(sec % 3600 / 60) < 10 ? `0${Math.floor(sec % 3600 / 60)}` : Math.floor(sec % 3600 / 60);
    const s = Math.floor(sec % 3600 % 60) < 10 ? `0${Math.floor(sec % 3600 % 60)}` : Math.floor(sec % 3600 % 60);
    return `${h}:${m}:${s}`
}