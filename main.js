async function fetchData(state = "weekly") {
  try {
    const res = await fetch("data.json");
    console.log(res);
    const data = await res.json();

    document.querySelectorAll(".item").forEach((item) => {
      item.remove();
    });

    data.forEach((item, i) => {
      const div = document.createElement("div");
      div.classList.add("item");
      div.classList.add("item" + (i + 2));

      div.innerHTML = `<div>
            <div class="icon">
            <p class="sect">${item.title}</p>
            <img src="./images/icon-ellipsis.svg"/>
            </div>
            <h2 class="time">${
              state === "daily"
                ? item.timeframes.daily.current
                : state === "weekly"
                ? item.timeframes.weekly.current
                : item.timeframes.monthly.current
            }Hrs</h2>
            <p class="date">Previus - ${
              state === "daily"
                ? item.timeframes.daily.previous
                : state === "weekly"
                ? item.timeframes.weekly.previous
                : item.timeframes.monthly.previous
            }hrs</p>
            </div>
            `;
      document.querySelector(".main").appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}
fetchData();

const nav = document.querySelectorAll(".lower p");

nav.forEach((item) => {
  item.addEventListener("click", (e) => {
    fetchData(e.target.innerHTML.toLowerCase());
    e.target.classList.add("active");
    nav.forEach((navItem) => {
      if (navItem !== e.target) {
        navItem.classList.remove("active");
      }
    });
  });
});
