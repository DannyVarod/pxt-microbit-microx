/**
 * Robotbit example
 */

// Initialization for motors and servos
uxMotion.initializePhaseWidthModulationDriver()

// Initialization for LEDs
uxDisplays.intializeOnboardPixelsRobotbit()

uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.SERVO.ROBOTBIT_SERVO1, 0)
uxMotion.setGreyGeekservoAngle(uxMotion.SERVO.ROBOTBIT_SERVO2, 0)
uxMotion.setLargeGreyGeekservoAngle(uxMotion.SERVO.ROBOTBIT_SERVO3, 0)
uxMotion.setServoPulseWidth(uxMotion.SERVO.ROBOTBIT_SERVO4, 0)

// Sensor and motion example
basic.forever(function () {
    let distance = uxSensors.ultrasonicDistanceCatShapedSensor(ux.PIN_NUMBER.PIN10)
    if (distance < 5) {
        uxMotion.setMotor(uxMotion.MOTOR.ROBOTBIT_M1A, -4095)
        uxMotion.setMotor(uxMotion.MOTOR.ROBOTBIT_M1B, -4095)
        uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.SERVO.ROBOTBIT_SERVO1, -1024)
        uxMotion.setGreyGeekservoAngle(uxMotion.SERVO.ROBOTBIT_SERVO2, 225)
        uxMotion.setLargeGreyGeekservoAngle(uxMotion.SERVO.ROBOTBIT_SERVO3, 360)
        uxMotion.setServoPulseWidth(uxMotion.SERVO.ROBOTBIT_SERVO4, 2646)
    }
    else if (distance < 10) {
        uxDisplays.setAllOnboardPixels(128, 0, 0)
        uxDisplays.refreshOnboardPixels()
    } else {
        uxMotion.setMotor(uxMotion.MOTOR.ROBOTBIT_M1A, 4095)
        uxMotion.setMotor(uxMotion.MOTOR.ROBOTBIT_M1B, 4095)
        uxDisplays.setAllOnboardPixels(10, 0, 0)
        uxDisplays.refreshOnboardPixels()
    }
})
