/**
 * Powerbrick example
 */

// Initialization for motors and servos
uxMotion.initializePhaseWidthModulationDriver()

// Powerbrick display example
uxDisplays.intializePowerbrickPixels(ux.PIN_NUMBER.PowerbrickPort3_DigitalA)

uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.SERVO.POWERBRICK_SERVO1, 0)
uxMotion.setGreyGeekservoAngle(uxMotion.SERVO.POWERBRICK_SERVO2, 0)
uxMotion.setLargeGreyGeekservoAngle(uxMotion.SERVO.POWERBRICK_SERVO3, 0)
uxMotion.setServoPulseWidth(uxMotion.SERVO.POWERBRICK_SERVO4, 0)

// Sensor and motion example
basic.forever(function () {
    let distance = uxSensors.ultrasonicDistancePowerbrickUltrasonicModule(ux.PIN_NUMBER.PowerbrickPort2_DigitalA)
    if (distance < 5) {
        uxMotion.setMotor(uxMotion.MOTOR.POWERBRICK_M1, -4095)
        uxMotion.setMotor(uxMotion.MOTOR.POWERBRICK_M2, -4095)
        uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.SERVO.POWERBRICK_SERVO1, -1024)
        uxMotion.setGreyGeekservoAngle(uxMotion.SERVO.POWERBRICK_SERVO2, 225)
        uxMotion.setLargeGreyGeekservoAngle(uxMotion.SERVO.POWERBRICK_SERVO3, 360)
        uxMotion.setServoPulseWidth(uxMotion.SERVO.POWERBRICK_SERVO4, 2646)
    }
    else if (distance < 10) {
        uxDisplays.setPowerbrickAllPixels(128, 0, 0)
        uxDisplays.refreshPowerbrickPixels()
    } else {
        uxMotion.setMotor(uxMotion.MOTOR.POWERBRICK_M1, 4095)
        uxMotion.setMotor(uxMotion.MOTOR.POWERBRICK_M2, 4095)
        uxDisplays.setPowerbrickAllPixels(10, 0, 0)
        uxDisplays.refreshPowerbrickPixels()
    }
})
