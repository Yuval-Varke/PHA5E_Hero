const images = [
    { image: document.getElementById("img1"), text: document.getElementById("text1") },
    { image: document.getElementById("img2"), text: document.getElementById("text2") },
    { image: document.getElementById("img3"), text: document.getElementById("text3") },
    { image: document.getElementById("img4"), text: document.getElementById("text4") }
];
const midtext = document.getElementById("mid");


midtext.style.color = "white";
midtext.style.opacity = "1";
images.forEach(({ image }) => image.style.opacity = 1);

function handleMouseMove(e, image, text) {
    const imgRect = image.getBoundingClientRect();
    const imgWidth = imgRect.width;
    const imgHeight = imgRect.height;

    const rangeX = imgWidth / 2;
    const rangeY = imgHeight / 2;

    const x = e.clientX - imgRect.left - imgWidth / 2;
    const y = e.clientY - imgRect.top - imgHeight / 2;

    if (x < -rangeX || x > rangeX || y < -rangeY || y > rangeY) {
        image.style.transition = "transform 1s ease-out";
        image.style.transform = "translate(0, 0)";
        text.style.opacity = "0";
        midtext.style.color = "white";
        images.forEach(({ image: img }) => img.style.opacity = 1);
        return;
    }

    const moveX = Math.max(-rangeX, Math.min(rangeX, x));
    const moveY = Math.max(-rangeY, Math.min(rangeY, y));

    image.style.transition = "transform 0.2s ease-out";
    image.style.transform = `translate(${moveX}px, ${moveY}px)`;

    text.style.transition = "transform 0.2s ease, opacity 0.3s ease-in-out";
    text.style.transform = `translate(${moveX}px, ${moveY}px)`;
    text.style.opacity = "1";

    midtext.style.color = "gray";
    images.forEach(({ image: img }) => {
        if (img !== image) img.style.opacity = 0.5;
    });
}

function handleMouseLeave(image, text) {
    image.style.transition = "transform 1s ease-out";
    image.style.transform = "translate(0, 0)";
    text.style.transform = "translate(0, 0)";
    text.style.opacity = "0";
    midtext.style.color = "white";
    images.forEach(({ image: img }) => img.style.opacity = 1);
}

images.forEach(({ image, text }) => {
    image.addEventListener("mousemove", (e) => handleMouseMove(e, image, text));
    image.addEventListener("mouseleave", () => handleMouseLeave(image, text));
});