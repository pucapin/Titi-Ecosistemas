// Estado y lógica del escenario (fondo)

const background = {
    x1: 0,
    x2: 0,
    image: null,
    width: 0,
    height: 0,
    scale: 1
};

const trees = {
    image: null,
    width: 0,
    height: 0,
    scale: 0.5, // Árbol más pequeño y proporcionado
    spacing: 0 // Se calculará basado en el ancho del fondo
};

/**
 * Carga la imagen del fondo y configura dimensiones/posición inicial
 * @param {CanvasRenderingContext2D} ctx
 * @param {{width:number,height:number,speed:number,running:boolean}} game
 * @returns {Promise<void>}
 */
export function initScene(ctx, game) {
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        const totalImages = 2;
        
        function onImageLoad() {
            loadedCount++;
            if (loadedCount === totalImages) {
                resolve();
            }
        }
        
        function onImageError(error) {
            reject(error);
        }
        
        // Cargar imagen del fondo
        background.image = new Image();
        background.image.onload = () => {
            background.scale = game.height / background.image.height;
            background.width = background.image.width * background.scale;
            background.height = game.height;
            background.x1 = 0;
            background.x2 = background.width;
            onImageLoad();
        };
        background.image.onerror = onImageError;
        background.image.src = '/assets/game/scene.svg';
        
        // Cargar imagen del árbol
        trees.image = new Image();
        trees.image.onload = () => {
            trees.width = trees.image.width * trees.scale;
            trees.height = trees.image.height * trees.scale;
            trees.spacing = background.width; // Un árbol por cada loop del fondo
            onImageLoad();
        };
        trees.image.onerror = onImageError;
        trees.image.src = '/assets/game/tree.svg';
    });
}

/**
 * Actualiza posición del fondo para efecto de scroll infinito
 * @param {{speed:number}} game
 */
export function updateScene(game) {
    background.x1 -= game.speed;
    background.x2 -= game.speed;

    if (background.x1 <= -background.width) {
        background.x1 = background.x2 + background.width;
    }
    if (background.x2 <= -background.width) {
        background.x2 = background.x1 + background.width;
    }
}

/**
 * Dibuja el fondo
 * @param {CanvasRenderingContext2D} ctx
 * @param {{height:number}} game
 */
export function drawScene(ctx, game) {
    if (!background.image) return;
    
    // Dibujar el fondo
    ctx.drawImage(background.image, background.x1, 0, background.width, background.height);
    ctx.drawImage(background.image, background.x2, 0, background.width, background.height);
    
}

/**
 * Dibuja los árboles por encima del mono
 * @param {CanvasRenderingContext2D} ctx
 * @param {{height:number}} game
 */
export function drawTrees(ctx, game) {
    // Dibujar árboles al final de cada escena
    if (trees.image && trees.image.complete) {
        const screenWidth = ctx.canvas.width;
        
        // Dibujar árbol para la primera escena (background.x1)
        if (background.x1 > -background.width && background.x1 < screenWidth) {
            const treeX1 = background.x1 + background.width - trees.width;
            const treeY = game.height - trees.height; // El árbol se extiende hacia arriba
            
            ctx.save();
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            
            ctx.drawImage(
                trees.image,
                treeX1,
                treeY,
                trees.width,
                trees.height
            );
            
            ctx.restore();
        }
        
        // Dibujar árbol para la segunda escena (background.x2)
        if (background.x2 > -background.width && background.x2 < screenWidth) {
            const treeX2 = background.x2 + background.width - trees.width;
            const treeY = game.height - trees.height; // El árbol se extiende hacia arriba
            
            ctx.save();
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            
            ctx.drawImage(
                trees.image,
                treeX2,
                treeY,
                trees.width,
                trees.height
            );
            
            ctx.restore();
        }
    }
}

/**
 * Exponer información útil del fondo (opcional)
 */
export function getBackground() {
    return background;
}

/**
 * Reinicia el estado de la escena
 */
export function resetScene() {
    background.x1 = 0;
    background.x2 = background.width;
}


