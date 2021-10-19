//=============================================================================
// TMPlugin - ジャンプアクション
// バージョン: 1.0.1
// 最終更新日: 2017/07/28
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc マップシーンをそれっぽいアクションゲームにします。
 * 使用方法などは配布サイトを参照してください。
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param gravity
 * @type string
 * @desc 重力の強さ。
 * 初期値: 0.004
 * @default 0.004
 *
 * @param friction
 * @type string
 * @desc 通常の地形とイベントの摩擦の強さ。
 * 初期値: 0.001
 * @default 0.001
 *
 * @param tileMarginTop
 * @type string
 * @desc 地形との接触判定に使う座標をどれだけ上へずらすか。
 * 初期値: 0.5
 * @default 0.5
 *
 * @param stepsForTurn
 * @type number
 * @desc 何マスの移動で１ターン経過するか。
 * 初期値: 20
 * @default 20
 *
 * @param allDeadEvent
 * @type number
 * @desc 全滅時に起動するコモンイベント番号。
 * 初期値: 0
 * @default 0
 * 
 * 
 * @param eventCollapse
 * @type boolean
 * @desc イベント戦闘不能時に崩壊エフェクトを使う。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 * 
 * @param stageRegion
 * @type number
 * @desc 足場として扱うリージョン番号。
 * 初期値: 60
 * @default 60
 *
 * @param wallRegion
 * @type number
 * @desc 壁として扱うリージョン番号。
 * 初期値: 61
 * @default 61
 *
 * @param slipWallRegion
 * @type number
 * @desc 壁ジャンプができない壁として扱うリージョン番号。
 * 初期値: 62
 * @default 62
 *
 * @param slipFloorRegion
 * @type number
 * @desc すべる床として扱うリージョン番号。
 * 初期値: 63
 * @default 63
 *
 * @param roughFloorRegion
 * @type number
 * @desc 移動速度半減の床として扱うリージョン番号。
 * 初期値: 64
 * @default 64
 *
 * @param marshFloorRegion
 * @type number
 * @desc 移動できない床として扱うリージョン番号。
 * 初期値: 65
 * @default 65
 *
 * @param waterTerrainTag
 * @type number
 * @desc 水中として扱う地形タグ番号。
 * 初期値: 1
 * @default 1
 * 
 * @param attackToOk
 * @type boolean
 * @desc 攻撃ボタンをメニューの決定ボタンとしても使うかどうか
 * 初期値: ON ( false = OFF 無効 / true =  ON 有効 )
 * @default true
 *
 * @param jumpToCancel
 * @type boolean
 * @desc ジャンプボタンをメニューのキャンセルボタンとしても使うかどうか
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param jumpSe
 * @desc ジャンプ効果音のファイル名。
 * 初期値: Crossbow
 * @default Crossbow
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param jumpSeParam
 * @type string
 * @desc ジャンプ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 * 
 * @param dashSe
 * @desc ダッシュ効果音のファイル名。
 * 初期値: Wind4
 * @default Wind4
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param dashSeParam
 * @type string
 * @desc ダッシュ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":50, "pan":0}
 * @default {"volume":90, "pitch":50, "pan":0}
 * 
 * @param changeSe
 * @desc 操作キャラ切り替え効果音のファイル名。
 * 初期値: Sword1
 * @default Sword1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param changeSeParam
 * @type string
 * @desc 操作キャラ切り替え効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 * 
 * @param carrySe
 * @desc イベント持ち上げ効果音のファイル名。
 * 初期値: Cancel1
 * @default Cancel1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param carrySeParam
 * @type string
 * @desc イベント持ち上げ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":70, "pan":0}
 * @default {"volume":90, "pitch":70, "pan":0}
 * 
 * @param weaponSprite
 * @type boolean
 * @desc 弾発射時に武器画像を表示する。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 * 
 * @param autoDamageSe
 * @type boolean
 * @desc 着弾時に自動で効果音を再生する。
 * 初期値: ON (false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param jumpKey
 * @type string
 * @desc プレイヤーのジャンプに使用するキー
 * 初期値: X
 * @default X
 *
 * @param dashKey
 * @type string
 * @desc プレイヤーのダッシュに使用するキー
 * 初期値: C
 * @default C
 *
 * @requiredAssets img/system/TMJumpActionShield
 * 
 * @help
 * TMPlugin - ジャンプアクション ver1.0.1
 *
 * 使い方:
 *
 *   詳細は配布サイトを参照してください。
 *
 *   このプラグインは RPGツクールMV Version 1.5.0 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 *
 * メモ欄タグ（アクター、装備、ステート）:
 * 
 *   <move_speed:0.05>        # 歩行速度
 *   <jump_speed:0.14>        # ジャンプ力
 *   <swim_speed:0.02>        # 泳ぐ速度
 *   <accele:0.003>           # 歩行加速度
 *   <jump_input:0>           # ジャンプ追加入力時間
 *   <swim_jump:0.1>          # 水中ジャンプ力
 *   <mulch_jump:1>           # 連続ジャンプ回数
 *   <weight:2>               # 重さ
 *   <gravity:0.0045>         # 重力
 *   <friction:0>             # 摩擦
 *   <wall_jump>              # 壁ジャンプ
 *   <dash_speed_x:0.14>      # ダッシュ速度（横方向）
 *   <dash_speed_y:0.03>      # ダッシュ速度（縦方向）
 *   <dash_count:15>          # ダッシュ時間
 *   <dash_delay:30>          # ダッシュ後硬直時間
 *   <dash_mp_cost:0>         # ダッシュに必要なＭＰ
 *
 * 
 * メモ欄タグ（イベント）:
 * 
 *   <w:0.375>                # 当たり判定（中心から左右の端までのサイズ）
 *   <h:0.75>                 # 当たり判定（足元から頭までのサイズ）
 *   <enemy:1>                # バトラー（敵番号）
 *   <dead:A>                 # バトラー戦闘不能時セルフスイッチ
 *   <repop:300>              # 再出現までの時間（フレーム）
 *   <lift>                   # リフト属性
 *   <weight:1>               # 重さ
 *   <gravity:0.004>          # 重力
 * 
 * 
 * メモ欄タグ（スキル）:
 * 
 *   <bullet_anime:67>        # 着弾時に再生するアニメーション
 *   <map_through>            # 弾が地形を無視して貫通する
 *   <map_reflect>            # 弾が地形に当たると消えずに跳ね返る
 *
 * 
 * プラグインコマンド:
 * 
 *   actGainHp -1 -5          # プレイヤーに 5 ダメージを与える。
 *   actGainHp 1 -100         # イベント 1 番に 100 ダメージを与える。
 *   actHp 1 2                # イベント 1 番のHPをゲーム変数 2 番に代入。
 *   actForceX -1 0.1         # プレイヤーの X 速度を 0.1 に強制変更。
 *   actForceY 1 -0.15        # イベント 1 番の Y 速度を -0.15 に強制変更。
 *   actForceStop -1          # プレイヤーの速度を 0 に強制変更。
 *   actChangeActor 2         # 操作キャラクターをアクター 2 番に変更。
 *   actHideHpGauge           # 足元HPゲージを隠す
 *   actShowHpGauge           # 足元HPゲージを表示する
 * 
 *   actPopup -1 テキスト #ff0000
 *     プレイヤーに赤色のテキストをポップアップ

 */

var Imported = Imported || {};
Imported.TMJumpAction = true;

if (!Imported.TMEventBase) {
  Imported.TMEventBase = true;
  (function() {
  
    //-----------------------------------------------------------------------------
    // Game_Event
    //
  
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) this.loadCommentParams();
    };

    Game_Event.prototype.loadCommentParams = function() {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (;;) {
            var match = re.exec(command.parameters[0]);
            if (match) {
              this._commentParams[match[1]] = match[2] === ':' ? match[3] : true;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function(paramName) {
      return this._commentParams[paramName] || this.event().meta[paramName] || null;
    };

  })();
}



(function() {

  var parameters = PluginManager.parameters('TMJumpAction');
  var actGravity = +(parameters['gravity'] || 0.004);
  var actFriction = +(parameters['friction'] || 0.000);
  var actTileMarginTop = +(parameters['tileMarginTop'] || 0.5);
  var actStageRegion = +(parameters['stageRegion'] || 60);
  var actRoughFloorRegion = +(parameters['roughFloorRegion'] || 64);
  var actMarshFloorRegion = +(parameters['marshFloorRegion'] || 65);
  var actSeJump = JSON.parse(parameters['jumpSeParam'] || '{}');
  actSeJump.name = parameters['jumpSe'] || '';
  var actSeDash = JSON.parse(parameters['dashSeParam'] || '{}');
  actSeDash.name = parameters['dashSe'] || '';
  var actSeChange = JSON.parse(parameters['changeSeParam'] || '{}');
  actSeChange.name = parameters['changeSe'] || '';

  //-----------------------------------------------------------------------------
  // Input
  //

  if (parameters['jumpKey']) {
    Input.keyMapper[38] = 'jump';
  }
  if (parameters['dashKey']) {
    Input.keyMapper[parameters['dashKey'].charCodeAt()] = 'dash';
  }


  //-----------------------------------------------------------------------------
  // Game_Map
  //

  // セットアップ setup
  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
  };


  // 乗り物は作らない Do not make vehicles
  Game_Map.prototype.createVehicles = function() {
    this._vehicles = [];
  };

  // 壁ジャンプが可能か判定する Determine if wall jump is possible
  Game_Map.prototype.canWallJump = function(x, y, d) {
    if (!this.isValid(x, y)) return false;

    return !this.isPassable(x, y, d);
  };

  // 通行チェック Traffic check
  Game_Map.prototype.checkPassage = function(x, y, bit) {
    if (!this.isValid(x, y)) return false;
    var rg = this.tileId(x, y, 5);

    var flags = this.tilesetFlags();
    var tiles = this.allTiles(x, y);
    for (var i = 0; i < tiles.length; i++) {
      var flag = flags[tiles[i]];
      if (rg === actStageRegion) flag |= 1;
      if ((flag & 0x10) !== 0) continue;      // [*] No effect on passage
      if ((flag & bit) === 0) return true;    // [o] Passable
      if ((flag & bit) === bit) return false; // [x] Impassable
    }
    return false;
  };






  

  // メンバ変数の初期化 Initialization of member variables
  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._needsRefresh = false;

    this._vx = 0;
    this._vy = 0;
    this._vxPlus = 0;
    this._lastY = 0;
    this._collideW = 0.375;
    this._collideH = 0.75;
    this._collideIds = [];
    this._landingObject = null;
    this._landingRegion = 0;
    this._lift = false;
    this._lockCount = 0;
    this._moveCount = 0;
    this._jumpInput = 0;
    this._dashCount = 0;
    this._friction = 0;
    this._moveSpeed = 0.05;
    this._jumpSpeed = 0.14;
    this._dashSpeedX = 0.1;
    this._dashSpeedY = 0.03;
    this._accele = 0.003
    this._jumpInputTime = 0;
    this._dashCountTime = 30;
    this._mulchJump = 1;
    this._gravity = actGravity;
  };

 
  // 移動状態判定 Movement state judgment
  Game_CharacterBase.prototype.isMoving = function() {
    return this._moveCount > 0;
  };

  // ダッシュ状態判定 Dash status judgment
  Game_CharacterBase.prototype.isDashing = function() {
    return this._dashCount > 0;
  };

  // 地面に立っているか Are you standing on the ground
  Game_CharacterBase.prototype.isLanding = function() {
    return this._landingObject !== null;
  };

  
  // ロック状態判定 Lock status judgment
  Game_CharacterBase.prototype.isLocking = function() {
    return this._lockCount > 0;
  };

  // リフレッシュフラグを立てる Set refresh flag
  Game_CharacterBase.prototype.requestRefresh = function() {
    this._needsRefresh = true;
  };

  // 移動速度のセット Set of movement speed
  Game_CharacterBase.prototype.setMoveSpeed = function(moveSpeed) {
    this._moveSpeed = moveSpeed / 100 + 0.02;
  };

  // フレーム更新 Frame update
  Game_CharacterBase.prototype.update = function() {
    this.updateMove();
    this.updateAnimation();
    // this.updateCollideIds();
    if (this.isDashing()) this.updateDashCount();
    if (this.isMoving()) {
      this.updateMoveCount();
    } else {
      this.updateStop();
    }

    if (this._needsRefresh) this.refresh();
  };

  // 画面 X 座標の取得 Get screen X coordinates
  Game_CharacterBase.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round(this.scrolledX() * tw);
  };

  // 画面 Y 座標の取得  Get screen Y coordinates
  Game_CharacterBase.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledY() * th);
  };

  // 移動の処理 Move processing
  Game_CharacterBase.prototype.updateMove = function() {
    this.updateGravity();
    this.updateFriction();
    if (this._vx !== 0 || this._vxPlus !== 0) {
      this._realX += this._vx + this._vxPlus;
      if (this._through) {
        this._realX = this._realX.clamp(0, $gameMap.width());
      } else {
        if (this._vx > 0) {
          this.collideMapRight();
          this.collideCharacterRight();
        } else {
          this.collideMapLeft();
          this.collideCharacterLeft();
        }
      }
      this._x = Math.floor(this._realX);
    }
    if (this._vy !== 0) {
      this._landingObject = null;
      this._realY += this._vy;
      if (this._through) {
        this._realY = this._realY.clamp(0, $gameMap.height());
      } else {
        if (this._vy > 0) {
          this.collideMapDown();
          this.collideCharacterDown();
        } else {
          this.collideMapUp();
          this.collideCharacterUp();
        }
      }
      this._y = Math.floor(this._realY);
      this._lastY = Math.floor(this._realY + actTileMarginTop);
    }
  };

  // 重力の処理 Gravity processing
  Game_CharacterBase.prototype.updateGravity = function() {
    if (this._jumpPeak > this._realY && this._gravity > 0) {
      this.resetPeak();
    }
    this._vy = Math.min(this._vy + this._gravity, this.maxFallSpeed());
  };

  // 最大落下速度の取得 Get maximum fall velocity
  Game_CharacterBase.prototype.maxFallSpeed = function() {
    return  1;
  };

  // 摩擦の処理 Friction treatment
  Game_CharacterBase.prototype.updateFriction = function() {
    if (this.isLanding()) {
      if (Object.prototype.toString.call(this._landingObject) !== '[object Array]' &&
          this._landingObject._lift) {
        this._vxPlus = this._landingObject._vx;
      }
    } else {
      this._vxPlus = 0;
    }
  };

  // 移動カウントの処理 Moving count processing
  Game_CharacterBase.prototype.updateMoveCount = function() {
    this._moveCount--;
    if (this._moveCount == 0 && !this.isDashing()) {
      this._vx = 0;
      if (this._gravity == 0) this._vy = 0;
    }
  };

  // ダッシュカウントの処理 Dash count processing
  Game_CharacterBase.prototype.updateDashCount = function() {
    this._dashCount--;
  };

  // 衝突しているキャラクターの処理 Handling of clashing characters
  // Game_CharacterBase.prototype.updateCollideIds = function() {
  //   for(var i = this._collideIds.length - 1; i >= 0; i--) {
  //     var id = this._collideIds[i];
  //     var character = id < 0 ? $gamePlayer : $gameMap.event(id);
  //     if (!this.isCollide(character)) {
  //       this._collideIds.splice(i, 1);
  //     }
  //   }
  // };

  // マップとの衝突判定（上方向）Collision detection with map (upward)
  Game_CharacterBase.prototype.collideMapUp = function() {
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    var y  = Math.floor(this._realY - this._collideH);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, y, 8)) {
        this._realY = y + 1.001 + this._collideH;
        this._vy = 0;
        this._jumpInput = 0;
        return;
      }
    }
  };

  // マップとの衝突判定（下方向） Collision detection with map (downward)
  Game_CharacterBase.prototype.collideMapDown = function() {
    var y = Math.floor(this._realY + actTileMarginTop);
    if (y === this._lastY) return;
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, y, 2)) {
        
        this._landingObject = [x, y];
        this._landingRegion = $gameMap.regionId(x, y);
        this.getLand(y - actTileMarginTop - 0.001);
        return;
      }
    }
  };

  // マップとの衝突判定（左方向）
  Game_CharacterBase.prototype.collideMapLeft = function() {
    var ty = Math.floor(this._realY - this._collideH);
    var by = Math.floor(this._realY + actTileMarginTop);
    var x = Math.floor(this._realX - this._collideW);
    for (var y = ty; y <= by; y++) {
      if (!$gameMap.isPassable(x, y, 4)) {
        this._realX = x + 1.001 + this._collideW;
        this._vx = 0;
        return;
      }
    }
  };

  // マップとの衝突判定（右方向）
  Game_CharacterBase.prototype.collideMapRight = function() {
    var ty = Math.floor(this._realY - this._collideH);
    var by = Math.floor(this._realY + actTileMarginTop);
    var x = Math.floor(this._realX + this._collideW);
    for (var y = ty; y <= by; y++) {
      if (!$gameMap.isPassable(x, y, 6)) {
        this._realX = x - 0.001 - this._collideW;
        this._vx = 0;
        return;
      }
    }
  };

  // キャラクターとの衝突判定（上方向）Collision detection with character (upward)
  Game_CharacterBase.prototype.collideCharacterUp = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) ) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift) {
            character._realY = this._realY - this._collideH - 0.001;
            character._vy = this._vy;
            character._landingObject = this;
            character.resetJump();
          } else {
            this._realY = character._realY + this._collideH + 0.001;
            this._vy = 0;
            this._jumpInput = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定（下方向）
  Game_CharacterBase.prototype.collideCharacterDown = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) ) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift) {
            character._realY = this._realY + character._collideH + 0.001;
            character._jumpInput = 0;
            character._vy = this._vy;
          } else {
            this._landingObject = character;
            this._landingRegion = -1;
            this.getLand(character._realY - character._collideH - 0.001);
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定（左方向）
  Game_CharacterBase.prototype.collideCharacterLeft = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) ) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift ) {
            character._realX = this._realX - this._collideW - 0.001 - character._collideW;
            character._vx = this._vx;
          } else {
            
            this._realX = character._realX + character._collideW + 0.001 + this._collideW;
            this._vx = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定（右方向）
  Game_CharacterBase.prototype.collideCharacterRight = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) ) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift ) {
            character._realX = this._realX + this._collideW + 0.001 + character._collideW;
            character._vx = this._vx;
          } else {
            
            this._realX = character._realX - character._collideW - 0.001 - this._collideW;
            this._vx = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定 Collision detection with character
  Game_CharacterBase.prototype.isCollide = function(character) {
    if (this.eventId() === character.eventId()) return false;
    return this._realX - this._collideW <= character._realX + character._collideW &&
           this._realX + this._collideW >= character._realX - character._collideW &&
           this._realY - this._collideH <= character._realY &&
           this._realY >= character._realY - character._collideH;
  };

  // 衝突判定を行う対象を返す Returns the target for collision detection
  Game_CharacterBase.prototype.collideTargets = function() {
    return $gameMap.events().concat($gamePlayer);
  };

  // 衝突している対象を追加する Add conflicting objects
  Game_CharacterBase.prototype.addCollideId = function(id) {
    if (this._collideIds.indexOf(id) == -1) {
      this._collideIds.push(id);
      this.checkEventTriggerCollide(id);
    }
  };

  // 地面に降りる Get down to the ground
  Game_CharacterBase.prototype.getLand = function(y) {
    this._realY = y;
    this._vy = 0;
    this.resetJump();
  };

  // ジャンプカウントのリセット Jump count reset
  Game_CharacterBase.prototype.resetJump = function() {
    this._jumpCount = this._mulchJump;
    this._jumpInput = 0;
  };


  // 最高到達点のリセット Reset the highest point
  Game_CharacterBase.prototype.resetPeak = function() {
    this._jumpPeak = this._realY;
  };


  // まっすぐに移動 Move straight
  Game_CharacterBase.prototype.moveStraight = function(d) {
    this.setDirection(d);
    this._moveCount = Math.floor(1 / this._moveSpeed);
    if (d === 2) {
      this._vy = this._moveSpeed;
    } else if (d === 4) {
      this._vx = -this._moveSpeed;
    } else if (d === 6) {
      this._vx = this._moveSpeed;
    } else {
      this._vy = -this._moveSpeed;
    }
  };

  // ななめに移動 Move diagonally
  Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
    this.setDirection(horz);
    this._moveCount = Math.floor(1 / this._moveSpeed);
    this._vx = horz === 4 ? -this._moveSpeed : this._moveSpeed;
    this._vy = vert === 8 ? -this._moveSpeed : this._moveSpeed;
  };

  // ジャンプ Jump
  Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
    if (this._jumpCount <= 0) return;
    this._jumpCount--;
    if (xPlus < 0) {
      this.setDirection(4);
      var speed = this._moveSpeed / 100 + 0.02;
      this._moveCount = Math.floor(1 / speed);
      this._vx = -speed;
    } else if (xPlus > 0) {
      this.setDirection(6);
      var speed = this._moveSpeed / 100 + 0.02;
      this._moveCount = Math.floor(1 / speed);
      this._vx = speed;
    }
    if (yPlus != 0) {
      this._vy = yPlus / 100;
    } else {
      this._vy =  -this._jumpSpeed;
    }
    this.resetStopCount();
    this.straighten();
  };

  // ダッシュ（方向指定） Dash (designate direction)
  Game_CharacterBase.prototype.dashFromDirection = function(direction) {
    var vx = direction === 4 ? -this._dashSpeedX : this._dashSpeedX;
    var vy = -this._dashSpeedY;
    this.dash(vx, vy);
  };

  // ダッシュ（速度指定） Dash (speed specification)
  Game_CharacterBase.prototype.dash = function(vx, vy) {
    this._vx = vx;
    this._vy = vy;
    this._dashCount = this._dashCountTime;
    this._moveCount = this._dashCount / 2;
    this.resetStopCount();
    this.straighten();
  };
 
  // 座標のセット Set of coordinates
  Game_CharacterBase.prototype.setPosition = function(x, y) {
    this._x = Math.floor(x);
    this._y = Math.floor(y);
    this._realX = x;
    this._realY = y;
  };

  // 指定位置へ移動 Move to specified position
  var _Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
  Game_CharacterBase.prototype.locate = function(x, y) {
    _Game_CharacterBase_locate.call(this, x, y);
    this._vx = 0;
    this._vy = 0;
    this._lastY = -1;
    this._collideIds = [];
    this.resetPeak();

  };







  // メンバ変数の初期化 Initialization of member variables
  var _Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    _Game_Player_initMembers.call(this);
    this._realSteps = 0;
    this._wallJump = false;
    this._dashDelay = 0;
    this._dashDelayTime = 30;
    this._dashMpCost = 0;

  };

  // 画面中央の X 座標 X coordinate in the center of the screen?
  // original function returns the players center x coordinate
  Game_Player.prototype.centerX = function() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0 + 0.5;
  };

  // 画面中央の Y 座標 Y coordinate in the center of the screen
  Game_Player.prototype.centerY = function() {
    return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0 + 0.5;
  };

  // イベントIDを返す Returns event ID
  Game_Player.prototype.eventId = function() {
    return -1;
  };

  // アクターの取得 Acquiring an actor
  Game_Player.prototype.actor = function() {
    return $gameParty.leader();
  };

 
  // ダッシュ状態判定 Dash status judgment
  Game_Player.prototype.isDashing = function() {
    return this._dashCount > 0;
  };



  // 衝突判定を行う対象を返す Returns the target for collision detection
  Game_Player.prototype.collideTargets = function() {
    return $gameMap.events();
  };
  
  // 衝突したイベントの起動 Invoking a conflicting event
  Game_Player.prototype.checkEventTriggerCollide = function(id) {
    if (!$gameMap.isEventRunning()) {
      var event = $gameMap.event(id);
  //    if (event.isTriggerIn([1, 2]) && event.isNormalPriority() === normal) {
      if (event.isTriggerIn([1, 2])) {
        event.start();
      }
    }
  };

  // フレーム更新 Frame update
  Game_Player.prototype.update = function(sceneActive) {
    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    if (this.isLocking()) {
      this.updateLock();
    } else {
      if (sceneActive && this.canMove()) this.updateInput();
      var lastRealX = this._realX;
      var lastRealY = this._realY;
      Game_Character.prototype.update.call(this);
      this.updateSteps(lastRealX, lastRealY);
    }
    this.updateScroll(lastScrolledX, lastScrolledY);
  };

  // 入力の処理 Input processing
  Game_Player.prototype.updateInput = function() {
    this.moveByInput();
    this.jumpByInput();
    this.dashByInput();
  };

  // 重力の処理 Gravity processing
  Game_Player.prototype.updateGravity = function() {
    if ( (this._jumpPeak > this._realY && this._gravity > 0)) {
      this.resetPeak();
    }
    Game_Character.prototype.updateGravity.call(this);
  };

  // 摩擦の処理 Friction treatment
  Game_Player.prototype.updateFriction = function() {
    Game_Character.prototype.updateFriction.call(this);
    this._friction = 0;
    
      // ダッシュ状態でなければ移動速度を超えないように調整する
      // Adjust so that the movement speed is not exceeded 
      // unless it is in the dash state
      if (!this.isDashing()) {
        var n = this._moveSpeed;
        if (this._vx < -n) {
          this._vx = Math.min(this._vx + 0.005, -n);
        } else if (this._vx > n) {
          this._vx = Math.max(this._vx - 0.005, n);
        }
      
      if (this.isLanding()) {
        var n = actFriction;
        var speed = this._moveSpeed;
        
        switch (this._landingRegion) {

        case actRoughFloorRegion:
          if (Math.abs(this._vx) > speed / 2) {
            this._vx = this._vx > 0 ? speed / 2 : -speed / 2;
          }
          break;
        case actMarshFloorRegion:
          this._vx = 0;
          return;
        default:
          
          break;
        }
        if (!this.isMoving()) {
          if (this._vx > 0) {
            this._vx = Math.max(this._vx - n, 0);
          } else if (this._vx < 0) {
            this._vx = Math.min(this._vx + n, 0);
          }
        }
      }
    }
  };

  // 移動カウントの処理 Moving count processing
  Game_Player.prototype.updateMoveCount = function() {
    this._moveCount--;
  };

   // ボタン入力によるジャンプ処理 Jump processing by button input
  Game_Player.prototype.jumpByInput = function() {
    if (this._jumpInput > 0) {
      this._jumpInput--;
      if (Input.isPressed('jump')) {
        this._vy = -this._jumpSpeed;
      } else {
        this._jumpInput = 0;
      }
    }
    if (Input.isTriggered('jump')) {
      if (this._jumpCount > 0) {
        this._jumpCount--;
      } else {
        if (!this._wallJump) return;
        if (this._direction == 4) {
          var x = Math.floor(this._realX - this._collideW - 0.16);
        } else {
          var x = Math.floor(this._realX + this._collideW + 0.16);
        }
        var y = Math.floor(this._realY);
        if (!$gameMap.canWallJump(x, y, this._direction)) return;
        this.wallJump();
      }
      
      this._jumpInput = this._jumpInputTime;
      if (this.isDashing()) {
        this._dashCount = this._dashCountTime;
        this._vx = this._direction == 4 ? -this._dashSpeedX : this._dashSpeedX
      }
      this._vy = -this._jumpSpeed;
      this.resetStopCount();
      this.straighten();
      AudioManager.playSe(actSeJump);
    }
  };

  // 壁ジャンプの X 方向処理 X-direction processing of wall jumps
  Game_Player.prototype.wallJump = function() {
    this._vx = this._direction == 4 ? this._moveSpeed : -this._moveSpeed;
    this.setDirection(this.reverseDir(this._direction));
    this.resetPeak();
  };

  // ボタン入力によるダッシュ処理 Dash processing by button input
  Game_Player.prototype.dashByInput = function() {
    if (this._dashDelay > 0) {
      this._dashDelay--;
     // 防御状態の解除
    } else {
           if (Input.isTriggered('dash') && 
          !$gameMap.isDashDisabled() >= this._dashMpCost) {
        
          if (!this._direction == 4) {
            this.setDirection(6);
          }
        
        this.dashFromDirection(this._direction);
        this._dashDelay = this._dashDelayTime;
        AudioManager.playSe(actSeDash);
     // 防御状態の解除
        
      }
    }
  };
  
  // 歩数の処理 Step count processing
  Game_Player.prototype.updateSteps = function(lastRealX, lastRealY) {
    this._realSteps += Math.max(Math.abs(this._realX - lastRealX), Math.abs(this._realY - lastRealY));
    if (this._realSteps >= 1) {
      if (this.isNormal()) {
        $gameParty.increaseSteps();
        if (this.actor()) this.actor().onPlayerWalk();
      }
      this._realSteps = 0;
    }
  };


  // マップイベントの起動 Invoking a map event
  Game_Player.prototype.startMapEvent = function(triggers, normal) {
    if (!$gameMap.isEventRunning()) {
      var targets = this.collideTargets();
      for (var i = 0; i < targets.length; i++) {
        var character = targets[i];
        if (this.isCollide(character)) {
          if (character.isTriggerIn(triggers) && character.isNormalPriority() === normal) {
            
            character.start();
          }
        }
      }
    }
  };

  // 接触しているイベントの起動判定 Judgment of activation of contacting event
  Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    if (this.canStartLocalEvents()) this.startMapEvent(triggers, false);
  };

  // 正面のイベント起動判定
  Game_Player.prototype.checkEventTriggerThere = function(triggers) {
    var lastRealX = this._realX;
    this._realX += this._direction == 4 ? -this._collideW : this._collideW
    this.startMapEvent(triggers, true);
    this._realX += this._direction == 4 ? -0.5 : 0.5;
    if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(Math.floor(this._realX), this._y)) {
      this._realX += this._direction == 4 ? -0.5 : 0.5;
      this.startMapEvent(triggers, true);
    }
    this._realX = lastRealX;
  };
 

  // 場所移動の実行 Perform location move
  Game_Player.prototype.performTransfer = function() {
    if (this.isTransferring()) {
      this.setDirection(this._newDirection);
      if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
        $gameMap.setup(this._newMapId);
        this._needsMapReload = false;
      }
      this.locate(this._newX + 0.5, this._newY + 0.99 - actTileMarginTop);
      this.refresh();
      this.clearTransferInfo();
    }
  };

  // リフレッシュ refresh
  Game_Player.prototype.refresh = function() {
    var actor = this.actor();
    if (actor) {
      var characterName   = actor.characterName();
      var characterIndex  = actor.characterIndex();
      var data = actor.actor();
      this._moveSpeed = +(data.meta['move_speed'] || 0.05);
      this._jumpSpeed = +(data.meta['jump_speed'] || 0.14);
      this._accele = +(data.meta['accele'] || 0.003);
      this._jumpInputTime = +(data.meta['jump_input'] || 0);
      this._mulchJump = +(data.meta['mulch_jump'] || 1);
      this._gravity = +(data.meta['gravity'] || 0.0045);
      this._dashSpeedX = +(data.meta['dash_speed_x'] || 0.14);
      this._dashSpeedY = +(data.meta['dash_speed_y'] || 0.03);
      this._dashCountTime = +(data.meta['dash_count'] || 15);
      this._dashDelayTime = +(data.meta['dash_delay'] || 30);
      this._dashMpCost = +(data.meta['dash_mp_cost'] || 0);
      this._collideW = +(data.meta['w'] || 0.375);
      this._collideH = +(data.meta['h'] || 0.75);

      var traitObjects = actor.equips().concat(actor.states());
      for (var i = 0; i < traitObjects.length; i++) {
        var obj = traitObjects[i];
        if (obj) {
          if (obj.meta['move_speed']) this._moveSpeed += +obj.meta['move_speed'];
          if (obj.meta['jump_speed']) this._jumpSpeed += +obj.meta['jump_speed'];
          if (obj.meta['accele']) this._accele += +obj.meta['accele'];
          if (obj.meta['jump_input']) this._jumpInputTime += +obj.meta['jump_input'];
          if (obj.meta['mulch_jump']) this._mulchJump += +obj.meta['mulch_jump'];
          if (obj.meta['gravity']) this._gravity += +obj.meta['gravity'];
          if (obj.meta['dash_speed_x']) this._dashSpeedX += +obj.meta['dash_speed_x'];
          if (obj.meta['dash_speed_y']) this._dashSpeedY += +obj.meta['dash_speed_y'];
          if (obj.meta['dash_count']) this._dashCountTime += +obj.meta['dash_count'];
          if (obj.meta['dash_delay']) this._dashDelayTime += +obj.meta['dash_delay'];
          if (obj.meta['dash_mp_cost']) this._dashMpCost += +obj.meta['dash_mp_cost'];
          if (obj.meta['w']) this._collideW += +obj.meta['w'];
          if (obj.meta['h']) this._collideH += +obj.meta['h'];

        }
      }

    } else {
      var characterName   = '';
      var characterIndex  = 0;
    }
    this.setImage(characterName, characterIndex);
    this._followers.refresh();
    this._needsRefresh = false;
  };

  // まっすぐに移動 Move straight
  Game_Player.prototype.moveStraight = function(d) {
    Game_Character.prototype.moveStraight.call(this, d);
  };






















  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  // メンバ変数の初期化
  var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    _Sprite_Character_initMembers.call(this);

    this._popups = [];
    this._effectType = null;
    this._effectDuration = 0;
    this._shake = 0;

  };

  // 武器スプライトの作成
  Sprite_Character.prototype.createWeaponSprite = function() {
    this._weaponSprite = new Sprite_Weapon();
    this.addChild(this._weaponSprite);
  };

  // フレーム更新
  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);


    
  };

  // その他の更新
  var _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
  Sprite_Character.prototype.updateOther = function() {
    if (!this.isEffecting()) _Sprite_Character_updateOther.call(this);
  };
  
  // エフェクトの開始
  Sprite_Character.prototype.startEffect = function(effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
    case 'appear':
      this.startAppear();
      break;
    case 'whiten':
      this.startWhiten();
      break;
    case 'collapse':
      this.startCollapse();
      break;
    case 'bossCollapse':
      this.startBossCollapse();
      break;
    }
    this.revertToNormal();
  };

  // 出現エフェクトの開始
  Sprite_Character.prototype.startAppear = function() {
    this._effectDuration = 16;
  };

  // 白フラッシュエフェクトの開始
  Sprite_Character.prototype.startWhiten = function() {
    this._effectDuration = 16;
  };

  // 崩壊エフェクトの開始
  Sprite_Character.prototype.startCollapse = function() {
    this._effectDuration = 32;
    this._appeared = false;
  };

  // ボス崩壊エフェクトの開始
  Sprite_Character.prototype.startBossCollapse = function() {
    this._effectDuration = this.bitmap.height;
    this._appeared = false;
  };

  // エフェクトの更新
  Sprite_Character.prototype.updateEffect = function() {
    this.setupEffect();
    if (this._effectDuration > 0) {
      this._effectDuration--;
      switch (this._effectType) {
      case 'appear':
        this.updateAppear();
        break;
      case 'whiten':
        this.updateWhiten();
        break;

      case 'collapse':
        this.updateCollapse();
        break;
      case 'bossCollapse':
        this.updateBossCollapse();
        break;
      }
      if (this._effectDuration === 0) {
        this._effectType = null;
        this.setBlendColor([0, 0, 0, 0]);
      }
    }
  };

  // エフェクトが実行中かどうか
  Sprite_Character.prototype.isEffecting = function() {
    return this._effectType !== null;
  };

  // スプライトのエフェクト設定を元に戻す
  Sprite_Character.prototype.revertToNormal = function() {
    this._shake = 0;
    this.blendMode = 0;
    this.opacity = 255;
    this.setBlendColor([0, 0, 0, 0]);
  };

  // 出現エフェクトの更新
  Sprite_Character.prototype.updateAppear = function() {
    this.opacity = (16 - this._effectDuration) * 16;
  };

  // 白フラッシュエフェクトの更新
  Sprite_Character.prototype.updateWhiten = function() {
    var alpha = 128 - (16 - this._effectDuration) * 10;
    this.setBlendColor([255, 255, 255, alpha]);
  };

  // 崩壊エフェクトの更新
  Sprite_Character.prototype.updateCollapse = function() {
    this.blendMode = Graphics.BLEND_ADD;
    this.setBlendColor([255, 128, 128, 128]);
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
  };

  // ボス崩壊エフェクトの更新
  Sprite_Character.prototype.updateBossCollapse = function() {
    this._shake = this._effectDuration % 2 * 4 - 2;
    this.blendMode = Graphics.BLEND_ADD;
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
    this.setBlendColor([255, 255, 255, 255 - this.opacity]);
    if (this._effectDuration % 20 === 19) {
      SoundManager.playBossCollapse2();
    }
  };

  // モーションの更新
  Sprite_Character.prototype.updateMotion = function() {
    this.setupWeaponAnimation();
    if (this._weaponSprite.isPlaying()) {
      if (this._character._direction == 4) {
        this._weaponSprite.scale.x = 1;
        this._weaponSprite.x = -16;
      } else {
        this._weaponSprite.scale.x = -1;
        this._weaponSprite.x = 16;
      }
    }
  };


  // HPゲージとシールドのbushDepth対応
  var _Sprite_Character_createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
  Sprite_Character.prototype.createHalfBodySprites = function() {
    var flag = !this._upperBody;
    _Sprite_Character_createHalfBodySprites.call(this);

  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);

  };

  // 飛行船の影の作成 Creating shadows for airships
  Spriteset_Map.prototype.createShadow = function() {
  };

  // 飛行船の影の更新 Airship shadow update
  Spriteset_Map.prototype.updateShadow = function() {
  };

})();
