/**
 * microX support for LED matrices.
 */
//% block=uxDisplays
//% color="#303030" weight=46 icon="\uf0eb"
//% groups='["Initialize", "On-board", "Powerbrick"]'
namespace uxDisplays {

    let onboardPixels: RGB_MATRIX = null
    let powerbrickPixels: RGB_MATRIX = null

    let initializedOnboardPixels = false
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
     * Initialize onboard pixels
     * @param pinNumber digital pin number
     * @param rows number of rows
     * @param columns number of columns
     */
    //% block="initialize onboard pixels"
    //% blockId="uxDisplays_intializeOnboardPixels|pin number %pinNumber|number of rows %rows|number of columns %columns"
    //% advanced=true
    //% weight=99
    export function intializeOnboardPixels(pinNumber: ux.PIN_NUMBER, rows: number, columns: number): void {
        if (initializedOnboardPixels)
            return
        
        onboardPixels = new RGB_MATRIX(rows, columns, pinNumber)
        initializedOnboardPixels = true

        // After initializing port set to black to prevent first refresh error
        setAllOnboardPixels(0, 0, 0)
        refreshOnboardPixels()
        setAllOnboardPixels(0, 0, 0)
        refreshOnboardPixels()
    }

    /**
     * Initialize onboard pixels for Robotbit
     * @param pinNumber digital pin number
     */
    //% block="initialize onboard pixels Robotbit"
    //% blockId="uxDisplays_intializeOnboardPixelsRobotbit"
    //% group="Initialize"
    //% weight=49
    export function intializeOnboardPixelsRobotbit(): void {
        intializeOnboardPixels(ux.PIN_NUMBER.PIN16, 1, 4)
    }

    /**
     * Initialize onboard pixels for Superbit
     * @param pinNumber digital pin number
     */
    //% block="initialize onboard pixels Superbit"
    //% blockId="uxDisplays_intializeOnboardPixelsSuperbit"
    //% group="Initialize"
    //% weight=48
    export function intializeOnboardPixelsSuperbit(): void {
        intializeOnboardPixels(ux.PIN_NUMBER.PIN12, 1, 4)
    }

    /**
     * Initialize onboard pixels for Superbit
     * @param pinNumber digital pin number
     */
    //% block="initialize onboard pixels Yurobot remote"
    //% blockId="uxDisplays_intializeOnboardPixelsYurobotRemote"
    //% group="Initialize"
    //% weight=47
    export function intializeOnboardPixelsYurobotRemote(): void {
        intializeOnboardPixels(ux.PIN_NUMBER.PIN15, 1, 6)
    }

    /**
     * Set all on-board pixels' color
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="set all on-board pixels to color|red %r|green %g|blue %b"
    //% blockId="uxDisplays_setAllOnboardPixels"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="On-board"
    //% weight=48
    export function setAllOnboardPixels(r: number, g: number, b: number): void {
        if (initializedOnboardPixels == false)
            return
        onboardPixels.setAllPixels(r, g, b)
    }
    
    /**
     * Set on-board pixel color 1D
     * @param y pixel y-coordinate
     * @param x pixel x-coordinate
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="set powerbrick pixel to color (1D)|y %y|x %x|red %r|green %g|blue %b"
    //% blockId="uxDisplays_setOnboardPixel1D"
    //% x.min=0 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="On-board"
    //% weight=47
    export function setOnboardPixel1D(x: number, r: number, g: number, b: number): void {
        if (initializedOnboardPixels == false)
            return
        onboardPixels.setPixel(1, x, r, g, b)
    }
    
    /**
     * Set on-board pixel color 2D
     * @param y pixel y-coordinate
     * @param x pixel x-coordinate
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="set powerbrick pixel to color (2D)|y %y|x %x|red %r|green %g|blue %b"
    //% blockId="uxDisplays_setOnboardPixel2D"
    //% y.min=0 x.min=0 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="On-board"
    //% weight=47
    export function setOnboardPixel2D(y: number, x: number, r: number, g: number, b: number): void {
        if (initializedOnboardPixels == false)
            return
        onboardPixels.setPixel(y, x, r, g, b)
    }

    /**
     * Refresh on-board pixels
    */
    //% block="refresh/update on-board pixels"
    //% blockId="uxDisplays_refreshOnboardPixels"
    //% port.min=0 port.max=6
    //% group="On-board"
    //% weight=45
    export function refreshOnboardPixels() {
        if (initializedOnboardPixels == false)
            return
            onboardPixels.refresh()
    }

    /**
     * Initialize Kittenbot Powerbrick pixels module
     * @param pinNumber digital pin number
     */
    //% block="initialize powerbrick pixels module connected to|digital pin %pinNumber"
    //% blockId="uxDisplays_intializePowerbrickPixels"
    //% group="Powerbrick"
    //% weight=35
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
    //% block="set powerbrick pixels to color|red %r|green %g|blue %b"
    //% blockId="uxDisplays_setPowerbrickAllPixels"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Powerbrick"
    //% weight=34
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
    //% block="set powerbrick pixel to color|y %y|x %x|red %r|green %g|blue %b"
    //% blockId="uxDisplays_setPowerbrickPixel"
    //% y.min=0 y.max=7 x.min=0 x.max=7 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Powerbrick"
    //% weight=33
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
    //% block="refresh/update powerbrick pixels"
    //% blockId="uxDisplays_refreshPowerbrickPixels"
    //% group="Powerbrick"
    //% weight=32
    export function refreshPowerbrickPixels() {
        if (initializedPowerbrickPixels == false)
            return
        powerbrickPixels.refresh()
    }
}
