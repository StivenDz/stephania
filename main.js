const { "0": data } = await Promise.all([
    await(await fetch("data.json")).json()
]);

const startDate = new Date("2024-12-15T16:00:00.000Z");
const openButton = document.getElementById("openButton");
const carouselContainer = document.getElementById("carousel");
const timeshareSpan = document.getElementById("timeshare");
const mainElement = document.getElementById("main");

const open = () => {
    document.body.classList.remove("hidden");
    openButton.removeEventListener("click", open);
    openButton.innerText = "Revelar Carousel";
    openButton.addEventListener("click", revealCarousel);
};

const revealCarousel = () => {
    let html = "";

    data.map((photo) => {
        html += `
            <div class="card" draggable="false">
                <div>
                    <div>
                        <figure>
                            <img src="${photo.img}" alt="">
                        </figure>
                        <span>
                            Stephania & Stiven ❤️
                        </span>
                    </div>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                </div>
                <figure>
                    <div></div>
                    <img src="${photo.img}" alt="">
                </figure>

                <figure class="icons">
                    <div>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" /></svg>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" /></svg>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-send"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                    </div>
                </figure>

                <div>
                    <p>
                        ${photo.description}
                    </p>
                </div>
            </div>
        
        `
    });

    carouselContainer.innerHTML = `<section id="scrollContainer">${html}</section>`;

    carouselContainer.classList.remove("closed");
    carouselContainer.classList.add("show");
    openButton.remove();
    enableScroll();
    // const a = document.createElement("a");
    // a.href = "#carousel"
    // a.click();
}

function calculate(startDate) {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return (`Años: ${years}, Meses: ${months}, Dias: ${days}, Horas: ${hours}, Minutos: ${minutes}, Segundos: ${seconds}`);
}

setInterval(() => {

    const text = calculate(startDate);
    timeshareSpan.innerText = text;


}, 1000);

const enableScroll = () => {
    const scrollContainer = document.getElementById("scrollContainer");

    scrollContainer.addEventListener("wheel",(e)=>{
        e.preventDefault();
        scrollContainer.scrollLeft += (e.deltaY) * 3;
        scrollContainer.style.scrollBehavior = "smooth"
    })
}


openButton.addEventListener("click", open);