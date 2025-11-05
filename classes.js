
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

    draw(ctx, canvasHeight) {
        if (this.imageLoaded) {
            const targetHeight = canvasHeight / 3;
            const scale = targetHeight / this.image.height;
            const targetWidth = this.image.width * scale;

            ctx.drawImage(
                this.image,
                0, 0, this.image.width, this.image.height,
                0, canvasHeight - targetHeight,
                targetWidth, targetHeight
            );
        }
    }
}


class Layer {
    constructor(image, speedModifier, canvasWidth, canvasHeight, baseGameSpeed) {
        this.image = image;
        this.speedModifier = speedModifier;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.baseGameSpeed = baseGameSpeed;
        this.y = 0;
        this.targetHeight = Math.round(canvasHeight * (2 / 3)) + 50;
        this.imageLoaded = false;
        this.tiles = [];
        this.image.onload = () => {
            this.imageLoaded = true;
            const scale = this.targetHeight / this.image.height;
            this.tileWidth = Math.round(this.image.width * scale);
            const count = Math.ceil(this.canvasWidth / this.tileWidth) + 2;
            this.tiles = [];
            for (let i = 0; i < count; i++) {
                this.tiles.push({ x: i * this.tileWidth });
            }
        };

        if (this.image.complete && this.image.naturalWidth) {
            this.image.onload();
        }
    }

    update(gameSpeed) {
        if (!this.imageLoaded) return;

        const speed = gameSpeed * this.speedModifier;


        for (let t of this.tiles) {
            t.x = Math.floor(t.x - speed);
        }


        for (let i = 0; i < this.tiles.length; i++) {
            const t = this.tiles[i];
            if (t.x + this.tileWidth <= -1) {
                let maxX = -Infinity;
                for (const tt of this.tiles) if (tt.x > maxX) maxX = tt.x;
                t.x = maxX + this.tileWidth;
            }
        }
    }

    draw(ctx) {
        if (!this.imageLoaded) return;

        // ha a tileWidth kisebb a canvas-nál, biztosítsuk a teljes kitöltést
        // egyszerűen kirajzoljuk az összes tile-t
        for (const t of this.tiles) {
            ctx.drawImage(
                this.image,
                0, 0, this.image.width, this.image.height,
                t.x, this.y, this.tileWidth, this.targetHeight
            );
        }
    }
}

class Obstacle {
    constructor(x, y, imageSrc, gameSpeed, canvasWidth) {
        this.x = x;
        this.y = y;
        this.pixelwidth = 62;
        this.pixelheight = 64;
        this.width = this.pixelwidth * (11 / 15);
        this.height = this.pixelheight * (11 / 15);
        this.image = new Image();
        this.image.src = imageSrc;
        this.gameSpeed = gameSpeed;
        this.canvasWidth = canvasWidth;
    }

    update() {
        this.x -= this.gameSpeed;
        if (this.x < -20) {
            this.x = this.canvasWidth;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.pixelwidth, this.pixelheight);
    }
}
class Coin {
    constructor(x, y, image, gameSpeed, canvasWidth) {
        this.x = x;
        this.y = y;
        this.width = 116/2;
        this.height = 115/2;
        this.image = image;
        this.gameSpeed = gameSpeed;
        this.canvasWidth = canvasWidth;
    }
    update() {
        this.x -= this.gameSpeed;
        if (this.x < -20) {
            this.x = this.canvasWidth + Math.random() * 1000;
            this.y = Math.random() * (CANVAS_HEIGHT*(2/3) - this.height);
        }
    }

    draw(ctx) {
  if (!this.image || !this.image.naturalWidth) return;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
