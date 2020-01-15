

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

      

      demo.rotation

      

      demo.velocity





5. デッドレコニング







