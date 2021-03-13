/**
 * microX support for LED matrices.
 */
//% block=uxDisplays
//% color="#303030" weight=46 icon="\uf0eb"
//% groups='["Robotbit", "Superbit", "Powerbrick"]'
namespace uxDisplays {

    let robotbitPixels: RGB_MATRIX = null
    let superbitPixels: RGB_MATRIX = null
    let powerbrickPixels: RGB_MATRIX = null

    let initializedRobotbitPixels = false
    let initializedSuperbitPixels = false
    let initializedPowerbrickPixels = false

    /**
     * Abstraction for led matrices
     */
    export class RGB_MATRIX {
        rows: number
        columns: number
        digitalPin: DigitalPin
        displayBuffer: Buffer

        constructor(rows: number, columns: number, pinNumber: ux.PIN_NUMBER) {
            this.rows = rows
            this.columns = columns
            this.digitalPin = ux.pinToDigitalPin(pinNumber)
            this.displayBuffer = pins.createBuffer(rows * columns * 3)
        }
    
        /**
         * Set Powerbrick all pixels' color
         * @param r pixel red intensity [0,255]
         * @param g pixel green intensity [0,255]
         * @param b pixel blue intensity [0,255]
        */
        public setAllPixels(r: number, g: number, b: number): void {
            r = ux.inRange(r, 0, 255)
            g = ux.inRange(g, 0, 255)
            b = ux.inRange(b, 0, 255)
            for (let y = 0; y < this.rows; y++) {
                for (let x = 0; x < this.columns; x++) {
                    this._setPixel(y, x, r, g, b)
                }
            }
        }
        
        /**
         * Set pixel color
         * @param y pixel y-coordinate [0,7]
         * @param x pixel y-coordinate [0,7]
         * @param r pixel red intensity [0,255]
         * @param g pixel green intensity [0,255]
         * @param b pixel blue intensity [0,255]
        */
       public setPixel(y: number, x: number, r: number, g: number, b: number): void {
            y = ux.inRange(y, 0, this.rows - 1)
            x = ux.inRange(x, 0, this.columns - 1)
            r = ux.inRange(r, 0, 255)
            g = ux.inRange(g, 0, 255)
            b = ux.inRange(b, 0, 255)
            this._setPixel(y, x, r, g, b)
        }
        
        private _setPixel(y: number, x: number, r: number, g: number, b: number): void {
            // 3 channels/sub-pixels (RGB) per pixel
            let pixelOffset = 0
            pixelOffset = (y * this.columns + x) * 3
            this.displayBuffer[pixelOffset + 0] = g
            this.displayBuffer[pixelOffset + 1] = r
            this.displayBuffer[pixelOffset + 2] = b
        }

        /**
         * Refresh pixels
        */
        public refresh() {
            ws2812b.sendBuffer(this.displayBuffer, this.digitalPin)
        }

    }

    /**
     * Initialize Kittenbot Robotbit pixels
     * @param pinNumber digital pin number
     */
    //% block="Initialize Robotbit Pixels"
    //% blockId="ux_intializeRobotbitPixels"
    //% group="Robotbit"
    //% weight=49
    export function intializeRobotbitPixels(): void {
        if (initializedRobotbitPixels)
            return
        
        robotbitPixels = new RGB_MATRIX(1, 4, ux.PIN_NUMBER.PIN16)
        initializedRobotbitPixels = true

        // After initializing port set to black to prevent first refresh error
        setRobotbitAllPixels(0, 0, 0)
        refreshRobotbitPixels()
        setRobotbitAllPixels(0, 0, 0)
        refreshRobotbitPixels()
    }

    /**
     * Set Robotbit all pixels color
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Robotbit pixels to color|red %r|green %g|blue %b"
    //% blockId="ux_setRobotbitAllPixels"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Robotbit"
    //% weight=48
    export function setRobotbitAllPixels(r: number, g: number, b: number): void {
        if (initializedRobotbitPixels == false)
            return
        robotbitPixels.setAllPixels(r, g, b)
    }
    
    /**
     * Set Robotbit pixel color
     * @param x pixel x-coordinate [0,3]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Robotbit pixel to color|x %x|red %r|green %g|blue %b"
    //% blockId="ux_setRobotbitPixel"
    //% x.min=0 x.max=3 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Robotbit"
    //% weight=47
    export function setRobotbitPixel(x: number, r: number, g: number, b: number): void {
        if (initializedRobotbitPixels == false)
            return
        robotbitPixels.setPixel(0, x, r, g, b)
    }

    /**
     * Refresh Robotbit pixels
    */
    //% block="Refresh/update Robotbit pixels"
    //% blockId="ux_refreshRobotbitPixels"
    //% port.min=0 port.max=6
    //% group="Robotbit"
    //% weight=46
    export function refreshRobotbitPixels() {
        if (initializedRobotbitPixels == false)
            return
        robotbitPixels.refresh()
    }

    /**
     * Initialize Yahboom Superbit pixels
     * @param pinNumber digital pin number
     */
    //% block="Initialize Superbit Pixels"
    //% blockId="ux_intializeSuperbitPixels"
    //% group="Superbit"
    //% weight=49
    export function intializeSuperbitPixels(): void {
        if (initializedSuperbitPixels)
            return
        
        superbitPixels = new RGB_MATRIX(1, 4, ux.PIN_NUMBER.PIN12)
        initializedSuperbitPixels = true

        // After initializing port set to black to prevent first refresh error
        setSuperbitAllPixels(0, 0, 0)
        refreshSuperbitPixels()
        setSuperbitAllPixels(0, 0, 0)
        refreshSuperbitPixels()
    }

    /**
     * Set Superbit all pixels color
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Superbit pixels to color|red %r|green %g|blue %b"
    //% blockId="ux_setSuperbitAllPixels"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Superbit"
    //% weight=48
    export function setSuperbitAllPixels(r: number, g: number, b: number): void {
        if (initializedSuperbitPixels == false)
            return
        superbitPixels.setAllPixels(r, g, b)
    }

    /**
     * Set Superbit pixel color
     * @param x pixel x-coordinate [0,3]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Superbit pixel to color|x %x|red %r|green %g|blue %b"
    //% blockId="ux_setSuperbitPixel"
    //% x.min=0 x.max=3 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Superbit"
    //% weight=47
    export function setSuperbitPixel(x: number, r: number, g: number, b: number): void {
        if (initializedSuperbitPixels == false)
            return
        superbitPixels.setPixel(0, x, r, g, b)
    }

    /**
     * Refresh Superbit pixels
    */
    //% block="Refresh/update Superbit pixels"
    //% blockId="ux_refreshSuperbitPixels"
    //% port.min=0 port.max=6
    //% group="Superbit"
    //% weight=46
    export function refreshSuperbitPixels() {
        if (initializedSuperbitPixels == false)
            return
        superbitPixels.refresh()
    }
    
    /**
     * Initialize Kittenbot Powerbrick pixels module
     * @param pinNumber digital pin number
     */
    //% block="Initialize Powerbrick Pixels module connected to|digital pin %pinNumber"
    //% blockId="ux_intializePowerbrickPixels"
    //% group="Powerbrick"
    //% weight=45
    export function intializePowerbrickPixels(pinNumber: ux.PIN_NUMBER): void {
        if (initializedPowerbrickPixels || pinNumber == null)
            return

        powerbrickPixels = new RGB_MATRIX(8, 8, pinNumber)
        
        initializedPowerbrickPixels = true
        
        // After initializing port set to black to prevent first refresh error
        setPowerbrickAllPixels(0, 0, 0)
        refreshPowerbrickPixels()
        setPowerbrickAllPixels(0, 0, 0)
        refreshPowerbrickPixels()
    }

    /**
     * Set Powerbrick all pixels color
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Powerbrick pixels to color|red %r|green %g|blue %b"
    //% blockId="ux_setPowerbrickAllPixels"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Powerbrick"
    //% weight=44
    export function setPowerbrickAllPixels(r: number, g: number, b: number): void {
        if (initializedPowerbrickPixels == false)
            return
        powerbrickPixels.setAllPixels(r, g, b)
    }
    
    /**
     * Set Powerbrick pixel color
     * @param y pixel y-coordinate [0,7]
     * @param x pixel x-coordinate [0,7]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Powerbrick pixel to color|y %y|x %x|red %r|green %g|blue %b"
    //% blockId="ux_setPowerbrickPixel"
    //% y.min=0 y.max=7 x.min=0 x.max=7 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Powerbrick"
    //% weight=43
    export function setPowerbrickPixel(y: number, x: number, r: number, g: number, b: number): void {
        if (initializedPowerbrickPixels == false)
            return
        // The pixels are wired up in a weird order, workaround:
        if (x % 2 == 0)
            powerbrickPixels.setPixel(x, y, r, g, b)
        else
            powerbrickPixels.setPixel(x, 7 - y, r, g, b)
    }

    /**
     * Refresh Powerbrick pixels
    */
    //% block="Refresh/update Powerbrick pixels"
    //% blockId="ux_refreshPowerbrickPixels"
    //% group="Powerbrick"
    //% weight=42
    export function refreshPowerbrickPixels() {
        if (initializedPowerbrickPixels == false)
            return
        powerbrickPixels.refresh()
    }
}
