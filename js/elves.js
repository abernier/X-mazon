console.log('link elves ok');



class Elf {
    constructor(startX, startY) {
        this.x = startX; // where to place Elf on X at the beginnning og the game.
        this.y = startY; // where to place Elf on Y at the beginnning og the game.
        this.img = document.createElement('img'); // <img>
        this.srcs = ["./assets/character/happy-elf-male.png", "./assets/character/happy_elf_male_loaded.png"];

        this.changeSrc(0) // new Elf()
    }
    changeSrc(i = 0) {
        this.img.onload = () => {
            const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
            this.w = 60;
            this.h = this.w / imgRatio;
            this.draw()
        }
        this.img.src = this.srcs[i];
    }
    draw() {
        if (!this.img) return;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };
}