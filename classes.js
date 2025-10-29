class Floor {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.imageLoaded = false;
        this.image.src = "cropped-xd2.png";
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }
  draw() {
    if (this.imageLoaded) {
        const targetHeight = CANVAS_HEIGHT / 3;
        const scale = targetHeight / this.image.height;
        const targetWidth = this.image.width * scale;

        ctx.drawImage(
            this.image,
            0, 0, this.image.width, this.image.height, // forrás
            0, CANVAS_HEIGHT - targetHeight, targetWidth, targetHeight // cél
        );
    }
}
}
class Layer
{
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 384;
        this.height = CANVAS_HEIGHT * (2 / 3) + 50;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
        update()
    {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) this.x = this.width+this.x2- this.speed;
        if (this.x2 <= -this.width) this.x2 = this.width + this.x - this.speed;
       
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}
    class Obstacle {
    constructor(x, y, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = 62;
        this.height = 64;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    update() {
        this.x -= gameSpeed;
        if (this.x < -20)
            {
              this.x = CANVAS_WIDTH; // Eltávolítás, ha kimegy a képernyőről
            } 
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}