

1. はじめに
   1. 研究背景
   2. 研究の目的
2. 本研究に関する技術
   1. マルチホップ通信
   2. ドローン
   3. Raspberry Pi 3 model b+
   4. UDP通信
   5. (websocket)
   6. (nodejs)
3. 本研究構成
   1. 研究概要
   2. マルチホップ通信ユニット
   3. システムの通信経路確立の流れ
   4. デッドレコニング
   5. 開発環境
4. システム構成
   1. システム概要
   2. 通信路自動確立機能
   3. 信号中継機能
   4. デッドレコニング
5. 評価実験
   1. 評価実験内容
   2. 実験環境
   3. 実験結果
   4. 考察
6. 結論
   1. 研究の達成状況
   2. 今後の課題

謝辞

参考文献



図一覧

シングルホップ通信

マルチホップ通信

Parrot社 AR.Drone 2.0

Raspberry Pi 3B+

UDP通信の送受信の例

研究の構成図

マルチホップ通信ユニット

センサユニット構成図

マルチホップ通信ユニットの機能



3. 本研究構成
   4. デッドレコニング



​			時間dtでの移動量dの計算方法
$$
dt \\
(xv, vy, vz) \\
(roll, pitch yaw) \\


R_X= [[1]]\\
R_y= \\
R_z=\\
R_z \cdot R_y \cdot R_x \cdot \begin{bmatrix} vx\cdot dt \\ vy\cdot dt \\ vz\cdot dt  \end{bmatrix}
$$


4. システム構成

   1. システム概要

   2. 通信路自動確立機能

   3. 信号中継機能

   4. センサーデータの取得
## demo
      ```json
      "demo": {
          "controlState": "CTRL_DEFAULT",
          "flyState": "FLYING_OK",
          "batteryPercentage": 87,
          "rotation": {
              "frontBack": -0.665,
              "pitch": -0.665,
              "theta": -0.665,
              "y": -0.665,
              "leftRight": -2.111,
              "roll": -2.111,
              "phi": -2.111,
              "x": -2.111,
              "clockwise": 21.597,
              "yaw": 21.597,
              "psi": 21.597,
              "z": 21.597
          },
          "frontBackDegrees": -0.665,
          "leftRightDegrees": -2.111,
          "clockwiseDegrees": 21.597,
          "altitude": 0,
          "altitudeMeters": 0,
          "velocity": {
              "x": 0,
              "y": 0,
              "z": 0
          },
          "xVelocity": 0,
          "yVelocity": 0,
          "zVelocity": 0,
          "frameIndex": 0,
          "detection": {
              "camera": {
                  "rotation": {
                      "m11": 0,
                      "m12": 0,
                      "m13": 0,
                      "m21": 0,
                      "m22": 0,
                      "m23": 0,
                      "m31": 0,
                      "m32": 0,
                      "m33": 0
                  },
                  "translation": {
                      "x": 0,
                      "y": 0,
                      "z": 0
                  },
                  "type": 3
              },
              "tagIndex": 0
          },
          "drone": {
              "camera": {
                  "rotation": {
                      "m11": 0.9297330975532532,
                      "m12": -0.36742836236953735,
                      "m13": -0.024346796795725822,
                      "m21": 0.36805105209350586,
                      "m22": 0.9293220639228821,
                      "m23": 0.029982319101691246,
                      "m31": 0.011609664186835289,
                      "m32": -0.0368364192545414,
                      "m33": 0.9992538690567017
                  },
                  "translation": {
                      "x": 0,
                      "y": 0,
                      "z": 0
                  }
              }
          }
      }
      ```
## full

```json
{
  header: 1432778632,
  droneState: {
    flying: 1,
    videoEnabled: 0,
    visionEnabled: 1,
    controlAlgorithm: 0,
    altitudeControlAlgorithm: 1,
    startButtonState: 1,
    controlCommandAck: 0,
    cameraReady: 1,
    travellingEnabled: 0,
    usbReady: 0,
    navdataDemo: 0,
    navdataBootstrap: 0,
    motorProblem: 0,
    communicationLost: 0,
    softwareFault: 0,
    lowBattery: 0,
    userEmergencyLanding: 0,
    timerElapsed: 0,
    MagnometerNeedsCalibration: 0,
    anglesOutOfRange: 0,
    tooMuchWind: 0,
    ultrasonicSensorDeaf: 0,
    cutoutDetected: 0,
    picVersionNumberOk: 1,
    atCodecThreadOn: 1,
    navdataThreadOn: 1,
    videoThreadOn: 1,
    acquisitionThreadOn: 1,
    controlWatchdogDelay: 0,
    adcWatchdogDelay: 0,
    comWatchdogProblem: 0,
    emergencyLanding: 0
  },
  sequenceNumber: 578041,
  visionFlag: 0,
  demo: {
    controlState: 'CTRL_TRANS_GOTOFIX',
    flyState: 'FLYING_OK',
    batteryPercentage: 57,
    rotation: {
      frontBack: 3.233,
      pitch: 3.233,
      theta: 3.233,
      y: 3.233,
      leftRight: -13.047,
      roll: -13.047,
      phi: -13.047,
      x: -13.047,
      clockwise: 132.488,
      yaw: 132.488,
      psi: 132.488,
      z: 132.488
    },
    frontBackDegrees: 3.233,
    leftRightDegrees: -13.047,
    clockwiseDegrees: 132.488,
    altitude: 0,
    altitudeMeters: 0,
    velocity: { x: -12.686165809631348, y: -54.63125991821289, z: 0 },
    xVelocity: -12.686165809631348,
    yVelocity: -54.63125991821289,
    zVelocity: 0,
    frameIndex: 0,
    detection: { camera: [Object], tagIndex: 0 },
    drone: { camera: [Object] }
  },
  time: 1311485.961,
  rawMeasures: {
    accelerometers: { x: 2044, y: 2072, z: 2576 },
    gyroscopes: { x: 9, y: 71, z: -33 },
    gyrometers: { x: 9, y: 71, z: -33 },
    gyroscopes110: { x: 0, y: 0 },
    gyrometers110: [ 0, 0 ],
    batteryMilliVolt: 11294,
    us: { echo: [Object], curve: [Object] },
    usDebutEcho: 1007,
    usFinEcho: 1448,
    usAssociationEcho: 1,
    usDistanceEcho: 1,
    usCourbeTemps: 11630,
    usCourbeValeur: 0,
    usCourbeRef: 120,
    echo: { flagIni: 1, num: 2, sum: 1900552 },
    flagEchoIni: 1,
    nbEcho: 2,
    sumEcho: 1900552,
    altTemp: 241,
    altTempRaw: 241
  },
  physMeasures: {
    temperature: { accelerometer: 54.544349670410156, gyroscope: 58129 },
    accelerometers: {
      x: 17.398948669433594,
      y: 54.081111907958984,
      z: -1021.7968139648438
    },
    gyroscopes: {
      x: 0.10643965750932693,
      y: -0.0960242971777916,
      z: 0.026050355285406113
    },
    alim3V3: 0,
    vrefEpson: 0,
    vrefIDG: 0
  },
  gyrosOffsets: { x: 0.10272853821516037, y: -0.7549481391906738, z: 0 },
  eulerAngles: { theta: 974, phi: -3029 },
  references: {
    theta: 0,
    phi: 0,
    thetaI: 0,
    phiI: 0,
    pitch: -28419,
    roll: 114676,
    yaw: -414,
    psi: 132346,
    vx: 0,
    vy: 0,
    thetaMod: -0.3715255558490753,
    phiMod: -1.534196376800537,
    kVX: 0,
    kVY: 0,
    kMode: 0,
    ui: { time: 0, theta: 0, phi: 0, psi: 0, psiAccuracy: 0, seq: 0 }
  },
  trims: {
    angularRates: { r: 0 },
    eulerAngles: { theta: -2449.571533203125, phi: 9999.9990234375 }
  },
  rcReferences: { pitch: -1, roll: -1, yaw: 0, gaz: 0, ag: 0 },
  pwm: {
    motors: [ 70, 70, 70, 70 ],
    satMotors: [ 255, 255, 255, 255 ],
    gazFeedForward: 48,
    gazAltitude: 0,
    altitudeIntegral: 0,
    vzRef: 0,
    uPitch: 0,
    uRoll: 0,
    uYaw: 0,
    yawUI: 92,
    uPitchPlanif: 65,
    uRollPlanif: 56,
    uYawPlanif: 64,
    uGazPlanif: 99.76166534423828,
    motorCurrents: [ 0, 0, 0, 0 ],
    altitudeProp: 0,
    altitudeDer: 0
  },
  altitude: {
    vision: 0,
    velocity: -0,
    ref: 241,
    raw: 241,
    observer: { acceleration: 0, altitude: 0, x: [Object], state: 0 },
    estimated: { vb: [Object], state: 0 }
  },
  visionRaw: { tx: 0, ty: 0, tz: 0 },
  visionOf: { dx: [ 0, 0, 0, 0, 0 ], dy: [ 0, 0, 0, 0, 0 ] },
  vision: {
    state: 2,
    misc: 0,
    phi: { trim: 0, refProp: 0 },
    theta: { trim: 0, refProp: -0 },
    newRawPicture: 0,
    capture: {
      theta: 0.05641384795308113,
      phi: -0.2278086245059967,
      psi: 2.3122196197509766,
      altitude: 0,
      time: 2262.322
    },
    bodyV: {
      x: -12.66596794128418,
      y: -53.059268951416016,
      z: -13.030755996704102
    },
    delta: { phi: 0, theta: 0, psi: 0 },
    gold: { defined: 0, reset: 0, x: 0, y: 0 }
  },
  visionPerf: {
    szo: 0,
    corners: 0,
    compute: 0,
    tracking: 0,
    trans: 0,
    update: 0,
    custom: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ]
  },
  trackersSend: {
    locked: [
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0
    ],
    point: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ]
  },
  visionDetect: {
    nbDetected: 0,
    type: [ 0, 0, 0, 0 ],
    xc: [ 0, 0, 0, 0 ],
    yc: [ 0, 0, 0, 0 ],
    width: [ 0, 0, 0, 0 ],
    height: [ 0, 0, 0, 0 ],
    dist: [ 0, 0, 0, 0 ],
    orientationAngle: [ 0, 0, 0, 0 ],
    rotation: [ [Object], [Object], [Object], [Object] ],
    translation: [ [Object], [Object], [Object], [Object] ],
    cameraSource: [ 0, 0, 0, 0 ]
  },
  watchdog: 5000,
  adcDataFrame: {
    version: 0,
    dataFrame: [
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0
    ]
  },
  videoStream: {
    quant: 0,
    frame: { size: 4159, number: 102761 },
    atcmd: { sequence: 23, meanGap: 0, varGap: 63137.3359375, quality: 0 },
    bitrate: { out: 0, desired: 0 },
    data: [ 0, 0, 0, 0, 0 ],
    tcpQueueLevel: 0,
    fifoQueueLevel: 0
  },
  games: { counters: { doubleTap: 0, finishLine: 0 } },
  pressureRaw: { up: 39010, ut: 30162, temperature: 512, pressure: 99783 },
  magneto: {
    mx: -67,
    my: -117,
    mz: -175,
    raw: { x: 398.98828125, y: 228.48046875, z: 617.28515625 },
    rectified: { x: 48.542755126953125, y: -7.760894775390625, z: 617.28515625 },
    offset: { x: 350.4455261230469, y: 236.24136352539062, z: 0 },
    heading: {
      unwrapped: 9.083431243896484,
      gyroUnwrapped: 0,
      fusionUnwrapped: -227.51205444335938
    },
    ok: 1,
    state: 2,
    radius: 314.907958984375,
    error: { mean: -265.748779296875, variance: 0.015625 }
  },
  windSpeed: {
    speed: 0,
    angle: 135.0000457763672,
    compensation: { theta: 0, phi: 0 },
    stateX: [ 0, -0, -0, 0, -279.0771484375, -1446.9661865234375 ],
    debug: [ 0, 0, 0 ]
  },
  kalmanPressure: {
    offsetPressure: 99699,
    estimated: {
      altitude: 0,
      velocity: 0,
      angle: [Object],
      us: [Object],
      covariance: [Object],
      groundEffect: true,
      sum: 2,
      reject: true,
      uMultisinus: 2.334423111718713e-41,
      gazAltitude: 0,
      flagMultisinus: false,
      flagMultisinusStart: false
    }
  },
  hdvideoStream: {
    hdvideoState: 0,
    storageFifo: { nbPackets: 0, size: 0 },
    usbkey: { size: 0, freespace: 0, remainingTime: 0 },
    frameNumber: 0
  },
  wifi: { linkQuality: 1 },
  gps: {
    latitude: 0,
    longitude: 0,
    elevation: 0,
    hdop: 0,
    dataAvailable: 0,
    zeroValidated: 0,
    wptValidated: 0,
    lat0: 0,
    lon0: 0,
    latFuse: 0.0010753921324687294,
    lonFuse: 0.0007802701162944236,
    gpsState: 0,
    xTraj: 0,
    xRef: 0,
    yTraj: 0,
    yRef: 0,
    thetaP: 0,
    phiP: 0,
    thetaI: 0,
    phiI: 0,
    thetaD: 0,
    phiD: 0,
    vdop: 0,
    pdop: 0,
    speed: 0,
    lastFrameTimestamp: 0,
    degree: 0,
    degreeMag: 0,
    ehpe: 0,
    ehve: 0,
    c_n0: 0,
    nbSatellites: 0,
    channels: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    gpsPlugged: 0,
    ephemerisStatus: 0,
    vxTraj: 0,
    vyTraj: 0,
    firmwareStatus: 0
  },

```
      

      demo.rotation

      

      demo.velocity





5. デッドレコニング







