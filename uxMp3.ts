/**
 * microX support for MP3 players.
 */
//% block=uxMp3
//% color="#303030" weight=45 icon="\uf001"
//% groups='["Powerbrick"]'
namespace uxMp3 {

    let mp3PlayerStartByte = 0x7e
    let mp3PlayerEndByte = 0xef

    let initializedPowerbrickMp3Player = false

    /**
     * Powerbrick MP3 action (1, 2, 3, 5, 6, 7)
     */
    export enum POWERBRICK_MP3_CONTROL_ACTION {
        //% block="play"
        PLAY = 0xaa,
        //% block="stop"
        STOP = 0xab,
        //% block="next"
        NEXT = 0xac,
        //% block="prev"
        PREV = 0xad
    }
    
    /**
     * Initializes the MP3 player connected to a specific serial pin (or Powerbrick serial port)
     * @param serialPinTx serial pin number (transmit)
     * @param serialPinRx serial pin number (receive)
     */
    //% block="initialize powerbrick MP3 player connected to|serial pin (TX) %serialPinTx|serial pin (RX) %serialPinRx"
    //% blockId="uxMp3_initializePowerbrickMp3Player"
    //% group="Powerbrick"
    //% weight=39
    export function initializePowerbrickMp3Player(serialPinTx: ux.PIN_NUMBER, serialPinRx: ux.PIN_NUMBER): void {   
        if (initializedPowerbrickMp3Player)
            return
        
        let txPin = ux.pinToSerialPin(serialPinTx)
        let rxPin = ux.pinToSerialPin(serialPinRx)
        if (txPin == null || rxPin == null)
            return

        serial.redirect(txPin, rxPin, BaudRate.BaudRate9600)
        initializedPowerbrickMp3Player = true
    }

    function _mp3PlayerSendArray(command: number, data: Array<number>): void {
        if (initializedPowerbrickMp3Player == false)
            return
        if (data == null)
            return
        let len = data.length
        if (len > 250)
            return
        let buffer = pins.createBuffer(len + 5)
        let sum: number = mp3PlayerStartByte + len + 3 + command
        buffer[0] = mp3PlayerStartByte
        buffer[1] = len + 3
        buffer[2] = command
        for (let i = 0; i < len; i++) {
            let d = data[i]
            buffer[3 + i] = d
            sum += d
        }
        buffer[len + 3] = sum
        buffer[len + 4] = mp3PlayerEndByte
        serial.writeBuffer(buffer)
    }

    function _mp3PlayerSendString(command: number, data: string): void {
        if (initializedPowerbrickMp3Player == false)
            return
        if (data == null)
            return
        let len = data.length
        if (len > 250)
            return
        let buffer = pins.createBuffer(len + 5)
        let sum: number = mp3PlayerStartByte + len + 3 + command
        buffer[0] = mp3PlayerStartByte
        buffer[1] = len + 3
        buffer[2] = command
        for (let i = 0; i < len; i++) {
            let d = data.charCodeAt(i)
            buffer[3 + i] = d
            sum += d
        }
        buffer[len + 3] = sum
        buffer[len + 4] = mp3PlayerEndByte
        serial.writeBuffer(buffer)
    }

    /**
     * Control the MP3 player
     * @param controlAction control action
     */
    //% block="powerbrick MP3 player|do %controlAction"
    //% blockId="uxMp3_mp3PlayerControl"
    //% group="Powerbrick"
    //% weight=38
    export function mp3PlayerControl(controlAction: POWERBRICK_MP3_CONTROL_ACTION): void {
        if (controlAction < POWERBRICK_MP3_CONTROL_ACTION.PLAY || controlAction > POWERBRICK_MP3_CONTROL_ACTION.PREV)
            return
        _mp3PlayerSendArray(controlAction, [])
    }

    /**
     * Set volume
     * @param volume volume
     */
    //% block="powerbrick MP3 player set|volume %volume"
    //% blockId="uxMp3_mp3PlayerSetVolume"
    //% volume.min=0 volume.max=31
    //% group="Powerbrick"
    //% weight=37
    export function mp3PlayerSetVolume(volume: number): void {
        volume = ux.inRange(volume, 0, 31)
        _mp3PlayerSendArray(0xae, [volume])
    }

    /**
     * Play a file by index
     * @param filenumber 1-based file number
     */
    //% block="powerbrick MP3 player play|file number %filenumber"
    //% blockId="uxMp3_mp3PlayerPlayFilenumber"
    //% filenumber.min=1 filenumber.max=255
    //% group="Powerbrick"
    //% weight=36
    export function mp3PlayerPlayFilenumber(filenumber: number): void {
        filenumber = ux.inRange(filenumber, 1, 255)
        _mp3PlayerSendArray(0xa2, [0, filenumber])
    }

    /**
     * Play a file by name
     * @param filename file name, up to 250 characters
     */
    //% block="powerbrick MP3 player play|file name %filename"
    //% blockId="uxMp3_mp3PlayerPlayFile"
    //% group="Powerbrick"
    //% weight=35
    export function mp3PlayerPlayFile(filename: string): void {
        if (filename == null || filename.length == 0)
            return
        _mp3PlayerSendString(0xa3, filename)
    }
}
