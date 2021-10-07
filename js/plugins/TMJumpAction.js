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
 * @param guardState
 * @type state
 * @desc 防御状態として扱うステート番号
 * 初期値: 2
 * @default 2
 * 
 * @param guardMoveRate
 * @type number
 * @desc 防御状態の移動速度補正（％）
 * 初期値: 25
 * @default 25
 * 
 * @param eventCollapse
 * @type boolean
 * @desc イベント戦闘不能時に崩壊エフェクトを使う。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 * 
 * @param hpGauge
 * @type boolean
 * @desc 足元にHPゲージを表示する機能を利用する。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param floorDamage
 * @type number
 * @desc ダメージ床から受けるダメージ。
 * 初期値: 10
 * @default 10
 *
 * @param damageFallRate
 * @type number
 * @desc 落下ダメージの倍率。
 * 初期値: 10
 * @default 10
 *
 * @param damageFallHeight
 * @type number
 * @desc 落下ダメージを受ける高さ。
 * 初期値: 5
 * @default 5
 *
 * @param flickWeight
 * @type number
 * @desc はじき飛ばせる重さの差。
 * 初期値: 1（ 0 なら同じ重さではじき飛ばせる )
 * @default 1
 *
 * @param flickSkill
 * @type skill
 * @desc はじき飛ばしのダメージ計算に使うスキル番号。
 * 初期値: 1（ 0 ならダメージなし )
 * @default 1
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
 * @param levelupPopup
 * @type string
 * @desc レベルアップ時に表示するポップアップ。
 * 初期値: LEVEL UP!!
 * @default LEVEL UP!!
 *
 * @param levelupAnimationId
 * @desc レベルアップ時に表示するアニメーション番号。
 * 初期値: 46
 * @default 46
 * @require 1
 * @type animation
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
 * @param useEventSeSwim
 * @type boolean
 * @desc 水に入ったときの効果音をイベントに適用する。
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
 * @param flickSe
 * @desc ダッシュはじき効果音のファイル名。
 * 初期値: Damage1
 * @default Damage1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param flickSeParam
 * @type string
 * @desc ダッシュはじき効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 * 
 * @param swimSe
 * @desc 入水効果音のファイル名。
 * 初期値: Water1
 * @default Water1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param swimSeParam
 * @type string
 * @desc 入水効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
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
 * @param hurlSe
 * @desc イベント投げ効果音のファイル名。
 * 初期値: Evasion1
 * @default Evasion1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param hurlSeParam
 * @type string
 * @desc イベント投げ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":70, "pan":0}
 * @default {"volume":90, "pitch":70, "pan":0}
 * 
 * @param guardSe
 * @desc 防御効果音のファイル名。
 * 初期値: Equip1
 * @default Equip1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param guardSeParam
 * @type string
 * @desc 防御効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":150, "pan":0}
 * @default {"volume":90, "pitch":150, "pan":0}
 * 

 *

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




 * @param attackKey
 * @type string
 * @desc プレイヤーの弾発射に使用するキー
 * 初期値: Z
 * @default Z
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
 * @param padButtons
 * @type string
 * @desc 利用するパッドボタンのコード
 * 初期値: ok,cancel,menu,shift,attack,jump,pageup,pagedown
 * @default ok,cancel,menu,shift,attack,jump,pageup,pagedown
 *
 * @param padButtonNames
 * @type string
 * @desc パッドボタンの名前
 * padButtonsと同じ並び順でボタンの名前を設定してください
 * @default 決定,キャンセル,メニュー,ダッシュ,アタック,ジャンプ,キャラ変更(前),キャラ変更(次)

 * @param defaultPadButtons
 * @type string
 * @desc パッドボタンの初期配置
 * 初期値: ボタン 1 ～ 12 に対応するコードを設定してください
 * @default cancel,ok,shift,jump,pageup,pagedown,attack,menu,menu,menu,menu,menu
 *
 * @param padConfigCommand
 * @type string
 * @desc パッドボタン配置のコマンド名 (空にすると機能を無効化)
 * 初期値: パッドボタン配置
 * @default パッドボタン配置
 * 
 * @param stepAnimeConstantA
 * @type string
 * @desc 足踏み速度定数Ａ
 * 初期値: 0.1
 * @default 0.1
 *
 * @param stepAnimeConstantB
 * @type string
 * @desc 足踏み速度定数Ｂ
 * 初期値: 300
 * @default 300
 *
 * @noteParam shot_se_name
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData weapons
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
 *   <ladder_speed:0.04>      # はしご移動速度
 *   <accele:0.003>           # 歩行加速度
 *   <ladder_accele:0.003>    # はしご移動加速度
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
 *   <fall_guard:50>          # 落下ダメージ耐性
 *   <guard_speed:15>         # 防御状態への移行速度
 *   <invincible_time:30>     # 被ダメージ後の無敵時間
 *   <shot_way:1>             # 同時に発射する弾の数
 *   <shot_space:0.2>         # 弾同士の間隔（ラジアン）
 *   <shot_speed:0.07>        # 弾の移動速度
 *   <shot_count:30>          # 弾の寿命
 *   <shot_type:1>            # 弾のタイプ
 *   <shot_index:0>           # 弾画像のインデックス
 *   <shot_skill:1>           # 弾のスキル番号
 *   <shot_delay:10>          # 発射後の硬直時間
 *   <shot_se_name:Attack2>   # 弾発射効果音のファイル名
 *   <shot_se_volume:90>      # 弾発射効果音のボリューム
 *   <shot_se_pitch:150>      # 弾発射効果音のピッチ
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
 *   <time_bomb:6 0 0.2 45 1 0 1>
 *     弾が時間切れで削除される際に新しく弾を発射する。
 *     パラメータはプラグインコマンド『nallShot』の n ～ skillId までを
 *     設定します。
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
 * 
 *   nwayShot eventId n space angle speed count type index skillId
 *     eventId: 弾を発射するイベントの番号（ -1 でプレイヤー）
 *     n:       同時に発射する弾の数
 *     space:   弾同士の間隔（ラジアン）
 *     angle:   発射する方向（ラジアン）
 *     speed:   弾の移動速度
 *     count:   弾の寿命
 *     type:    弾のタイプ
 *     index:   弾画像のインデックス
 *     skillId: 弾のスキル（ダメージ計算用、省略可）
 * 
 *   nwayAim eventId n space angle speed count type index skillId
 *     nway_shot と同様ですが、angleにプレイヤーがいる方向（ラジアン）を
 *     自動的に加算します。angleが 0 なら自機狙いになります。
 *
 *   nallShot eventId n angle speed count type index skillId
 *     全方位に向けて弾を発射します、弾同士の間隔は自動で設定されます。
 *
 *   nallAim eventId n space angle speed count type index skillId
 *     nall_shot の自機狙い版です。
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
  var actStepsForTurn = +(parameters['stepsForTurn'] || 20);



  var actFlickWeight = +(parameters['flickWeight'] || 1);
  var actStageRegion = +(parameters['stageRegion'] || 60);

  var actRoughFloorRegion = +(parameters['roughFloorRegion'] || 64);
  var actMarshFloorRegion = +(parameters['marshFloorRegion'] || 65);
  var actWaterTerrainTag = +(parameters['waterTerrainTag'] || 1);


  var actJumpToCancel = JSON.parse(parameters['jumpToCancel']);
  var actUseEventSeSwim = JSON.parse(parameters['useEventSeSwim']);
  var actSeJump = JSON.parse(parameters['jumpSeParam'] || '{}');
  actSeJump.name = parameters['jumpSe'] || '';
  var actSeDash = JSON.parse(parameters['dashSeParam'] || '{}');
  actSeDash.name = parameters['dashSe'] || '';
  var actSeFlick = JSON.parse(parameters['flickSeParam'] || '{}');
  actSeFlick.name = parameters['flickSe'] || '';
  var actSeSwim = JSON.parse(parameters['swimSeParam'] || '{}');
  actSeSwim.name = parameters['swimSe'] || '';
  var actSeChange = JSON.parse(parameters['changeSeParam'] || '{}');
  actSeChange.name = parameters['changeSe'] || '';
  var actSeCarry = JSON.parse(parameters['carrySeParam'] || '{}');
  actSeCarry.name = parameters['carrySe'] || '';
  var actSeHurl = JSON.parse(parameters['hurlSeParam'] || '{}');
  actSeHurl.name = parameters['hurlSe'] || '';


  var actWeaponSprite = JSON.parse(parameters['weaponSprite']);


  var padButtons = parameters['padButtons'].split(',');
  var padButtonNames = parameters['padButtonNames'].split(',');
  var defaultPadButtons = parameters['defaultPadButtons'].split(',');
  var padConfigCommand = parameters['padConfigCommand'];
  var actStepAnimeConstantA = +(parameters['stepAnimeConstantA'] || 0.1);
  var actStepAnimeConstantB = +(parameters['stepAnimeConstantB'] || 300);

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
  // ConfigManager
  //

  ConfigManager.getPadButton = function(id) {
    return Input.gamepadMapper[id];
  };
  
  ConfigManager.setPadButton = function(id, code) {
    Input.gamepadMapper[id] = code;
  };

  var _ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.call(this);
    for (var i = 0; i < 12; i++) {
      config['padButton' + i] = this.getPadButton(i);
    }
    return config;
  };

  var _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    for (var i = 0; i < 12; i++) {
      this.setPadButton(i, this.readPadButton(config, i));
    }
  };

  ConfigManager.readPadButton = function(config, id) {
    return config['padButton' + id] || defaultPadButtons[id];
  };

  //-----------------------------------------------------------------------------
  // Game_System
  //

  var _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);

  };



  //-----------------------------------------------------------------------------
  // Game_Action
  //

  

  
  //-----------------------------------------------------------------------------
  // Game_Actor
  //


  // 何マスの移動で１ターン経過するか
  Game_Actor.prototype.stepsForTurn = function() {
    return actStepsForTurn;
  };

 


  // アクター（＋装備、ステート）のタグからパラメータ（数値）をロード
  Game_Actor.prototype.loadTagParam = function(param_name, default_value) {
    var result = +(this.actor().meta[param_name] || default_value);
    var equips = this.equips().concat(this.states());
    for (var i = 0; i < equips.length; i++) {
      if (equips[i] && equips[i].meta[param_name]) {
        result += +equips[i].meta[param_name];
      }
    }
    return result;
  };

  // アクター（＋装備、ステート）のタグからパラメータ（真偽値）をロード
  Game_Actor.prototype.loadTagBool = function(param_name) {
    var equips = this.equips().concat(this.states(), this.actor());
    for (var i = 0; i < equips.length; i++) {
      if (equips[i] && equips[i].meta[param_name]) return true;
    }
    return false;
  };

  // アクター（＋装備、ステート）のタグからパラメータ（文字列）をロード
  Game_Actor.prototype.loadTagString = function(param_name, default_value) {
    var equips = this.states().concat(this.equips(), this.actor());
    for (var i = equips.length - 1; i >= 0; i--) {
      if (equips[i] && equips[i].meta[param_name]) {
        return equips[i].meta[param_name];
      }
    }
    return default_value;
  };


  
  //-----------------------------------------------------------------------------
  // Game_Party
  //

  Game_Party.prototype.frontSlideActor = function() {
    for (var i = 0; i < this.size(); i++) {
      this._actors.push(this._actors.shift());
      if (!this.leader().isDead()) break;
    }
    $gamePlayer.refresh();
  };

  Game_Party.prototype.backSlideActor = function() {
    for (var i = 0; i < this.size(); i++) {
      this._actors.unshift(this._actors.pop());
      if (!this.leader().isDead()) break;
    }
    $gamePlayer.refresh();
  };

  Game_Party.prototype.sortActor = function(actorId) {
    for (var i = 0; i < this.size(); i++) {
      this._actors.push(this._actors.shift());
      if (this._actors[0] === actorId) break;
    }
    $gamePlayer.refresh();
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  // セットアップ
  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
  };



  // 乗り物は作らない
  Game_Map.prototype.createVehicles = function() {
    this._vehicles = [];
  };

  // 壁ジャンプが可能か判定する
  Game_Map.prototype.canWallJump = function(x, y, d) {
    if (!this.isValid(x, y)) return false;

    return !this.isPassable(x, y, d);
  };

  // 通行チェック
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
    this._lastSwim = false;
    this._collideW = 0.375;
    this._collideH = 0.75;
    this._collideIds = [];
    this._landingObject = null;
    this._landingRegion = 0;
    this._ladder = false;
    this._lift = false;
    this._lockCount = 0;
    this._moveCount = 0;
    this._jumpInput = 0;
    this._dashCount = 0;
    this._friction = 0;
    this._moveSpeed = 0.05;
    this._jumpSpeed = 0.14;
    this._swimSpeed = 0.02;
    this._dashSpeedX = 0.1;
    this._dashSpeedY = 0.03;
    this._ladderSpeed = 0.04;
    this._accele = 0.003
    this._ladderAccele = 0.003;
    this._jumpInputTime = 0;
    this._dashCountTime = 30;
    this._swimJump = 0.1;
    this._mulchJump = 1;
    this._weight = 0;
    this._gravity = actGravity;

    this._invincibleCount = 0;
    this._invincibleTime = 10;
    this._carried = false;
    this._carryingObject = null;
  };

 
  // 移動状態判定
  Game_CharacterBase.prototype.isMoving = function() {
    return this._moveCount > 0;
  };

  // ダッシュ状態判定
  Game_CharacterBase.prototype.isDashing = function() {
    return this._dashCount > 0;
  };

  // 地面に立っているか
  Game_CharacterBase.prototype.isLanding = function() {
    return this._landingObject !== null;
  };

  // およぎ状態判定
  Game_CharacterBase.prototype.isSwimming = function() {
    return this.terrainTag() === actWaterTerrainTag;
  };

  // 持ち上げられ状態判定
  Game_CharacterBase.prototype.isCarried = function() {
    return this._carried;
  };

  
  // ロック状態判定
  Game_CharacterBase.prototype.isLocking = function() {
    return this._lockCount > 0;
  };

  // 自分の重さで相手をはじき飛ばせるかチェック
  Game_CharacterBase.prototype.checkFlickWeight = function(weight) {
    return this._weight >= weight + actFlickWeight;
  };

  // 被弾後の無敵状態判定
  Game_CharacterBase.prototype.isInvincible = function() {
    return this._invincibleCount > 0;
  };

  // リフレッシュフラグを立てる
  Game_CharacterBase.prototype.requestRefresh = function() {
    this._needsRefresh = true;
  };

  // 移動速度のセット
  Game_CharacterBase.prototype.setMoveSpeed = function(moveSpeed) {
    this._moveSpeed = moveSpeed / 100 + 0.02;
  };



  // アニメーション間隔 Animation interval
  Game_CharacterBase.prototype.animationWait = function() {
    return (actStepAnimeConstantA - this._moveSpeed -
            (this.isDashing() ? 0.01 : 0)) * actStepAnimeConstantB;
  };

  // フレーム更新
  Game_CharacterBase.prototype.update = function() {
    this.updateMove();
    this.updateAnimation();
    this.updateCollideIds();
    if (this.isDashing()) this.updateDashCount();
    if (this.isMoving()) {
      this.updateMoveCount();
    } else {
      this.updateStop();
    }
    if (this.isSwimming() !== this._lastSwim) this.updateSwiming();
    if (this._needsRefresh) this.refresh();
    if (this.isInvincible()) this._invincibleCount--;
  };

  // 画面 X 座標の取得
  Game_CharacterBase.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round(this.scrolledX() * tw);
  };

  // 画面 Y 座標の取得
  Game_CharacterBase.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledY() * th);
  };

  // 移動の処理
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

  // 重力の処理
  Game_CharacterBase.prototype.updateGravity = function() {
    if (this._jumpPeak > this._realY && this._gravity > 0) {
      this.resetPeak();
    }
    this._vy = Math.min(this._vy + this._gravity, this.maxFallSpeed());
  };

  // 最大落下速度の取得
  Game_CharacterBase.prototype.maxFallSpeed = function() {
    return this.isSwimming() ? 0.04 : 1;
  };

  // 摩擦の処理
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

  // 移動カウントの処理
  Game_CharacterBase.prototype.updateMoveCount = function() {
    this._moveCount--;
    if (this._moveCount == 0 && !this.isDashing()) {
      this._vx = 0;
      if (this._gravity == 0) this._vy = 0;
    }
  };

  // ダッシュカウントの処理
  Game_CharacterBase.prototype.updateDashCount = function() {
    this._dashCount--;
  };

  // 衝突しているキャラクターの処理
  Game_CharacterBase.prototype.updateCollideIds = function() {
    for(var i = this._collideIds.length - 1; i >= 0; i--) {
      var id = this._collideIds[i];
      var character = id < 0 ? $gamePlayer : $gameMap.event(id);
      if (!this.isCollide(character)) {
        this._collideIds.splice(i, 1);
      }
    }
  };

  // キャラクターとの直線距離を返す
  Game_CharacterBase.prototype.distFromCharacter = function(character) {
    var x = this._realX - character._realX;
    var y = this._realY - character._realY;
    return Math.sqrt(x * x + y * y);
  };

  // マップとの衝突判定（上方向）
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

  // マップとの衝突判定（下方向）
  Game_CharacterBase.prototype.collideMapDown = function() {
    var y = Math.floor(this._realY + actTileMarginTop);
    if (y === this._lastY) return;
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, y, 2)) {
        if (this._ladder && $gameMap.isLadder(x, y)) continue;
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

  // キャラクターとの衝突判定（上方向）
  Game_CharacterBase.prototype.collideCharacterUp = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) && !character.isCarried()) {
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
      if (this.isCollide(character) && !character.isCarried()) {
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
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift || this._ladder) {
            character._realX = this._realX - this._collideW - 0.001 - character._collideW;
            character._vx = this._vx;
          } else {
            if (this.isDashing() && this.checkFlickWeight(character._weight)) {
              character.flick(this);
            }
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
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift || this._ladder) {
            character._realX = this._realX + this._collideW + 0.001 + character._collideW;
            character._vx = this._vx;
          } else {
            if (this.isDashing() && this.checkFlickWeight(character._weight)) {
              character.flick(this);
            }
            this._realX = character._realX - character._collideW - 0.001 - this._collideW;
            this._vx = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定
  Game_CharacterBase.prototype.isCollide = function(character) {
    if (this.eventId() === character.eventId()) return false;
    return this._realX - this._collideW <= character._realX + character._collideW &&
           this._realX + this._collideW >= character._realX - character._collideW &&
           this._realY - this._collideH <= character._realY &&
           this._realY >= character._realY - character._collideH;
  };

  // 衝突判定を行う対象を返す
  Game_CharacterBase.prototype.collideTargets = function() {
    return $gameMap.events().concat($gamePlayer);
  };

  // 衝突している対象を追加する
  Game_CharacterBase.prototype.addCollideId = function(id) {
    if (this._collideIds.indexOf(id) == -1) {
      this._collideIds.push(id);
      this.checkEventTriggerCollide(id);
    }
  };

  // 地面に降りる
  Game_CharacterBase.prototype.getLand = function(y) {
    this._realY = y;
    this._vy = 0;
    this.resetJump();

  };

  // ジャンプカウントのリセット
  Game_CharacterBase.prototype.resetJump = function() {
    this._jumpCount = this._mulchJump;
    this._jumpInput = 0;
  };


  // 最高到達点のリセット
  Game_CharacterBase.prototype.resetPeak = function() {
    this._jumpPeak = this._realY;
  };


  // まっすぐに移動
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

  // ななめに移動
  Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
    this.setDirection(horz);
    this._moveCount = Math.floor(1 / this._moveSpeed);
    this._vx = horz === 4 ? -this._moveSpeed : this._moveSpeed;
    this._vy = vert === 8 ? -this._moveSpeed : this._moveSpeed;
  };

  // ジャンプ
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
      this._vy = this.isSwimming() ? -this._swimJump : -this._jumpSpeed;
    }
    this.resetStopCount();
    this.straighten();
  };

  // ダッシュ（方向指定）
  Game_CharacterBase.prototype.dashFromDirection = function(direction) {
    var vx = direction === 4 ? -this._dashSpeedX : this._dashSpeedX;
    var vy = -this._dashSpeedY;
    this.dash(vx, vy);
  };

  // ダッシュ（速度指定）
  Game_CharacterBase.prototype.dash = function(vx, vy) {
    this._vx = vx;
    this._vy = vy;
    this._dashCount = this._dashCountTime;
    this._moveCount = this._dashCount / 2;
    this.resetStopCount();
    this.straighten();
  };


  // 持ち上げられる
  Game_CharacterBase.prototype.carry = function() {
    this._carried = true;
    this._through = true;
  };

  // 投げられる
  Game_CharacterBase.prototype.hurl = function() {
    this._carried = false;
    this._through = false;
    this._lastSwim = this.isSwimming();
  };


 
  // 座標のセット
  Game_CharacterBase.prototype.setPosition = function(x, y) {
    this._x = Math.floor(x);
    this._y = Math.floor(y);
    this._realX = x;
    this._realY = y;
  };

  // 指定位置へ移動
  var _Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
  Game_CharacterBase.prototype.locate = function(x, y) {
    _Game_CharacterBase_locate.call(this, x, y);
    this._vx = 0;
    this._vy = 0;
    this._lastY = -1;
    this._lastSwim = this.isSwimming();
    this._collideIds = [];
    this.resetPeak();
    this._carried = false;
    this._carryingObject = null;
  };

  // メンバ変数の初期化
  var _Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    _Game_Player_initMembers.call(this);
    this._realSteps = 0;
    this._carryPower = 0;
    this._wallJump = false;
    this._dashDelay = 0;
    this._dashDelayTime = 30;
    this._dashMpCost = 0;

    this._shotWay = 0;
    this._shotSpace = 0.2;
    this._shotSpeed = 0.1;
    this._shotCountTime = 30;
    this._shotDelayTime = 10;
    this._shotType = 1;
    this._shotIndex = 0;
    this._shotSkillId = 0;
    this._shotSeName = "";
    this._shotSeVolume = 0;
    this._shotSePitch = 0;
    this._carryingObject = null;
  };

  // 画面中央の X 座標
  Game_Player.prototype.centerX = function() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0 + 0.5;
  };

  // 画面中央の Y 座標
  Game_Player.prototype.centerY = function() {
    return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0 + 0.5;
  };

  // イベントIDを返す
  Game_Player.prototype.eventId = function() {
    return -1;
  };

  // アクターの取得
  Game_Player.prototype.actor = function() {
    return $gameParty.leader();
  };

 
  // ダッシュ状態判定
  Game_Player.prototype.isDashing = function() {
    return this._dashCount > 0;
  };

  // 持ち上げ状態の取得
  Game_Player.prototype.isCarrying = function() {
    return this._carryingObject !== null;
  };

  // 衝突判定を行う対象を返す
  Game_Player.prototype.collideTargets = function() {
    return $gameMap.events();
  };

  // はしごにつかまる
  Game_Player.prototype.getOnLadder = function(downFlag) {
    this._ladder = true;
    this._landingObject = null;
    this.setDirection(8);
    var lastRealX = this._realX;
    this._realX = Math.floor(this._realX) + 0.5;
    if (downFlag) this._realY += 0.04;
    this._lastY = Math.floor(this._realY + actTileMarginTop);
    if (lastRealX < this._realX) {
      this.collideCharacterLeft();
    } else if (lastRealX > this._realX) {
      this.collideCharacterRight();
    }
    this._vx = 0;
    this._vy = 0;
    this.resetJump();
    this.resetPeak();
  };

  // はしごから降りる
  Game_Player.prototype.getOffLadder = function() {
    this._ladder = false;
    this.setDirection(Input.isPressed('left') ? 4 : 6);
  };

  // 衝突したイベントの起動
  Game_Player.prototype.checkEventTriggerCollide = function(id) {
    if (!$gameMap.isEventRunning()) {
      var event = $gameMap.event(id);
  //    if (event.isTriggerIn([1, 2]) && event.isNormalPriority() === normal) {
      if (event.isTriggerIn([1, 2])) {
        event.start();
      }
    }
  };

  // フレーム更新
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
    
  //  this._followers.update();
  };

  // 入力の処理
  Game_Player.prototype.updateInput = function() {
    this.carryByInput();
    if (this.isCarrying()) this._shotDelay = 1;
    this.changeByInput();
    this.moveByInput();
    this.jumpByInput();
    this.dashByInput();

    this.triggerButtonAction();
  };

  // 重力の処理
  Game_Player.prototype.updateGravity = function() {
    if (this._ladder || (this._jumpPeak > this._realY && this._gravity > 0)) {
      this.resetPeak();
      if (this._ladder) return;
    }
    Game_Character.prototype.updateGravity.call(this);
  };

  // 摩擦の処理
  Game_Player.prototype.updateFriction = function() {
    Game_Character.prototype.updateFriction.call(this);
    this._friction = 0;
    if (this._ladder) {
      var n = this.isMoving() ? 0 : actFriction;
      if (this._vy !== 0) {
        this._vy = this._vy > 0 ? Math.max(this._vy - n, 0) : Math.min(this._vy + n, 0);
      }
    } else {
      // ダッシュ状態でなければ移動速度を超えないように調整する
      if (!this.isDashing()) {
        var n = this.isSwimming() ? this._swimSpeed : this._moveSpeed;
        if (this._vx < -n) {
          this._vx = Math.min(this._vx + 0.005, -n);
        } else if (this._vx > n) {
          this._vx = Math.max(this._vx - 0.005, n);
        }
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

  // 移動カウントの処理
  Game_Player.prototype.updateMoveCount = function() {
    this._moveCount--;
  };

  
  // ボタン操作による持ち上げ（投げ）
  Game_Player.prototype.carryByInput = function() {
    if (this.isCarrying()) {
      if (Input.isTriggered('attack')) {
        var target = this._carryingObject;
        var lastRealX = target._realX;
        target.collideMapLeft();
        if (lastRealX !== target._realX) {
          target._realX = lastRealX;
          return;
        }
        target.collideMapRight();
        if (lastRealX !== target._realX) {
          target._realX = lastRealX;
          return;
        }
        var lastRealY = target._realY;
        target.collideMapUp();
        if (lastRealY !== target._realY) {
          target._realY = lastRealY;
          return;
        }
        target.collideMapDown();
        if (lastRealY !== target._realY) {
          target._realY = lastRealY;
          return;
        }
        var targets = target.collideTargets();
        for (var i = 0; i < targets.length; i++) {
          var character = targets[i];
          if (!character._through && target.isCollide(character)) return;
        }
        this.executeHurl();
      }
    } else {
      if (Input.isTriggered('attack') && Input.isPressed('down') &&
          this.isLanding()  &&
          Object.prototype.toString.call(this._landingObject) !== '[object Array]') {
        if (this._carryPower >= this._landingObject._weight) {
          this.executeCarry();
        } else {
          this._shotDelay = 1;
        }
      }
    }
  };

  // 持ち上げる
  Game_Player.prototype.executeCarry = function() {
    this._carryingObject = $gameMap.event(this._landingObject.eventId());
    this._carryingObject.carry();
    this._landingObject = null;
    AudioManager.playSe(actSeCarry);
  };

  // 投げる
  Game_Player.prototype.executeHurl = function() {
    this._carryingObject.hurl();
    if (Input.isPressed('up')) {            // 上を押しながら投げた
      this._carryingObject.dash(this._vx, -0.14);
    } else if (Input.isPressed('down')) {   // 下を押しながら投げた
      if (this._direction === 4) {
        this._carryingObject.dash(-0.05, -0.02);
      } else if (this._direction === 6) {
        this._carryingObject.dash(0.05, -0.02);
      } else {
        this._carryingObject.dash(0, -0.02);
      }
    } else {    // 左右いずれかを押しながら、またはどちらも押さずに投げた
      if (this._direction === 4 || Input.isPressed('left')) {
        this._carryingObject.dash(-0.14, -0.03)
      } else if (this._direction === 6 || Input.isPressed('right')) {
        this._carryingObject.dash(0.14, -0.03)
      } else {
        this._carryingObject.dash(0, 0);
      }
    }
    this._carryingObject = null;
    this._shotDelay = 1;
    AudioManager.playSe(actSeHurl);
  };

  
  // ボタン入力による操作アクター変更
  Game_Player.prototype.changeByInput = function() {
    if (this._carryingObject) return;
    
  };



  


  // ボタン入力によるジャンプ処理
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
      if (this.isSwimming()) {
        this.resetJump();
        this._jumpCount--;
      } else if (this._jumpCount > 0) {
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
      if (this._ladder) {
        this.getOffLadder();
        if (Input.isPressed('down')) return;
      }
      this._jumpInput = this._jumpInputTime;
      if (this.isDashing()) {
        this._dashCount = this._dashCountTime;
        this._vx = this._direction == 4 ? -this._dashSpeedX : this._dashSpeedX
      }
      this._vy = this.isSwimming() ? -this._swimJump : -this._jumpSpeed;
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

  // ボタン入力によるダッシュ処理
  Game_Player.prototype.dashByInput = function() {
    if (this._dashDelay > 0) {
      this._dashDelay--;
     // 防御状態の解除
    } else {
           if (Input.isTriggered('dash') && !this.isSwimming() &&
          !$gameMap.isDashDisabled() && battler.mp >= this._dashMpCost) {
        if (this._ladder) {
          this.getOffLadder()
          if (Input.isPressed('left')) {
            this.setDirection(4);
          } else if (Input.isPressed('right')) {
            this.setDirection(6);
          }
        } else {
          if (!this._direction == 4) {
            this.setDirection(6);
          }
        }
        this.dashFromDirection(this._direction);
        this._dashDelay = this._dashDelayTime;
        AudioManager.playSe(actSeDash);
     // 防御状態の解除
        
      }
    }
  };

  
  // 歩数の処理
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

  // 泳ぎ状態の更新
  Game_Player.prototype.updateSwiming = function() {
    Game_Character.prototype.updateSwiming.call(this);
    AudioManager.playSe(actSeSwim);
    this.resetPeak();
  };

  // マップイベントの起動
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

  // 接触しているイベントの起動判定
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

  // はしごと接触しているか
  Game_Player.prototype.isCollideLadder = function(downFlag) {
    var x = Math.floor(this._realX);
    if (downFlag) {
      if (!this.isLanding()) return false;
      var y = Math.floor(this._realY + actTileMarginTop + 0.1);
      return $gameMap.isLadder(x, y);
    } else {
      var ty = Math.floor(this._realY - this._collideH);
      var by = Math.floor(this._realY + actTileMarginTop);
      for (var y = ty; y <= by; y++) {
        if ($gameMap.isLadder(x, y)) return true;
      }
      return false;
    }
  };

  // 場所移動の実行
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

  // リフレッシュ
  Game_Player.prototype.refresh = function() {
    var actor = this.actor();
    if (actor) {
      var characterName   = actor.characterName();
      var characterIndex  = actor.characterIndex();
      var data = actor.actor();
      this._moveSpeed = +(data.meta['move_speed'] || 0.05);
      this._jumpSpeed = +(data.meta['jump_speed'] || 0.14);
      this._swimSpeed = +(data.meta['swim_speed'] || 0.02);
      this._ladderSpeed = +(data.meta['ladder_speed'] || 0.04);
      this._accele = +(data.meta['accele'] || 0.003);
      this._ladderAccele = +(data.meta['ladder_accele'] || 0.003);
      this._jumpInputTime = +(data.meta['jump_input'] || 0);
      this._swimJump = +(data.meta['swim_jump'] || 0.1);
      this._mulchJump = +(data.meta['mulch_jump'] || 1);
      this._weight = +(data.meta['weight'] || 0);
      this._carryPower = +(data.meta['carry_power'] || 0);
      this._gravity = +(data.meta['gravity'] || 0.0045);
      this._dashSpeedX = +(data.meta['dash_speed_x'] || 0.14);
      this._dashSpeedY = +(data.meta['dash_speed_y'] || 0.03);
      this._dashCountTime = +(data.meta['dash_count'] || 15);
      this._dashDelayTime = +(data.meta['dash_delay'] || 30);
      this._dashMpCost = +(data.meta['dash_mp_cost'] || 0);
      this._collideW = +(data.meta['w'] || 0.375);
      this._collideH = +(data.meta['h'] || 0.75);

      this._invincibleTime = +(data.meta['invincible_time'] || 30);
      this._shotWay = +(data.meta['shot_way'] || 0);
      this._shotSpace = +(data.meta['shot_space'] || 0.2);
      this._shotSpeed = +(data.meta['shot_speed'] || 0.1);
      this._shotCountTime = +(data.meta['shot_count'] || 30);
      this._shotDelayTime = +(data.meta['shot_delay'] || 10);
      var traitObjects = actor.equips().concat(actor.states());
      for (var i = 0; i < traitObjects.length; i++) {
        var obj = traitObjects[i];
        if (obj) {
          if (obj.meta['move_speed']) this._moveSpeed += +obj.meta['move_speed'];
          if (obj.meta['jump_speed']) this._jumpSpeed += +obj.meta['jump_speed'];
          if (obj.meta['swim_speed']) this._swimSpeed += +obj.meta['swim_speed'];
          if (obj.meta['ladder_speed']) this._ladderSpeed += +obj.meta['ladder_speed'];
          if (obj.meta['accele']) this._accele += +obj.meta['accele'];
          if (obj.meta['ladder_accele']) this._ladderAccele += +obj.meta['ladder_accele'];
          if (obj.meta['jump_input']) this._jumpInputTime += +obj.meta['jump_input'];
          if (obj.meta['swim_jump']) this._swimJump += +obj.meta['swim_jump'];
          if (obj.meta['mulch_jump']) this._mulchJump += +obj.meta['mulch_jump'];
          if (obj.meta['weight']) this._weight += +obj.meta['weight'];
          if (obj.meta['carry_power']) this._carryPower += +obj.meta['carry_power'];
          if (obj.meta['gravity']) this._gravity += +obj.meta['gravity'];
          if (obj.meta['dash_speed_x']) this._dashSpeedX += +obj.meta['dash_speed_x'];
          if (obj.meta['dash_speed_y']) this._dashSpeedY += +obj.meta['dash_speed_y'];
          if (obj.meta['dash_count']) this._dashCountTime += +obj.meta['dash_count'];
          if (obj.meta['dash_delay']) this._dashDelayTime += +obj.meta['dash_delay'];
          if (obj.meta['dash_mp_cost']) this._dashMpCost += +obj.meta['dash_mp_cost'];
          if (obj.meta['w']) this._collideW += +obj.meta['w'];
          if (obj.meta['h']) this._collideH += +obj.meta['h'];

          if (obj.meta['invincible_time']) this._invincibleTime += +obj.meta['invincible_time'];
          if (obj.meta['shot_way']) this._shotWay += +obj.meta['shot_way'];
          if (obj.meta['shot_space']) this._shotSpace += +obj.meta['shot_space'];
          if (obj.meta['shot_speed']) this._shotSpeed += +obj.meta['shot_speed'];
          if (obj.meta['shot_count']) this._shotCountTime += +obj.meta['shot_count'];
          if (obj.meta['shot_delay']) this._shotDelayTime += +obj.meta['shot_delay'];
        }
      }
      this._wallJump = actor.loadTagBool('wall_jump');
      this._shotType = +actor.loadTagString('shot_type', 1);
      this._shotIndex = +actor.loadTagString('shot_index', 0);
      this._shotSkillId = +actor.loadTagString('shot_skill', 0);
      this._shotSeName = actor.loadTagString('shot_se_name', '');
      this._shotSeVolume = +actor.loadTagString('shot_se_volume', 90);
      this._shotSePitch = +actor.loadTagString('shot_se_pitch', 100);
    } else {
      var characterName   = '';
      var characterIndex  = 0;
    }
    this.setImage(characterName, characterIndex);
    this._followers.refresh();
    this._needsRefresh = false;
  };

  // まっすぐに移動
  Game_Player.prototype.moveStraight = function(d) {
    Game_Character.prototype.moveStraight.call(this, d);
  };


  //-----------------------------------------------------------------------------
  // Game_Event
  //

  // 初期化
  Game_Event.prototype.initialize = function(mapId, eventId) {
    Game_Character.prototype.initialize.call(this);
    this._mapId = mapId;
    this._eventId = eventId;
    this._repopCount = 0;
    this.locate(this.event().x + 0.5, this.event().y + 1);
    this.refresh();
  };

  // メンバ変数の初期化
  var _Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);


    this._deadSelfSwitch = null;
    this._commentParams = {};
  };



  // 衝突したイベントの起動
  Game_Event.prototype.checkEventTriggerCollide = function(id) {
    if (!$gameMap.isEventRunning() && id < 0) {
//      if (this.isTriggerIn([1, 2]) && this.isNormalPriority() === normal) {
      if (this.isTriggerIn([1, 2])) this.start();
    }
  };

  // リフレッシュ
  var _Game_Event_refresh = Game_Event.prototype.refresh;
  Game_Event.prototype.refresh = function() {
    _Game_Event_refresh.call(this);
    this._needsRefresh = false;
  };

  // イベントページのセットアップ
  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {

      this._collideW       = +this.loadTagParam('w') || 0.375;
      this._collideH       = +this.loadTagParam('h') || 0.75;
      this._weight         = +this.loadTagParam('weight') || 0;
      this._deadSelfSwitch = this.loadTagParam('dead');
      this._repopTimer     = +this.loadTagParam('repop') || 0;
      if (this._repopTimer > 0) {
        this._repopCount = this._repopTimer;
      }
      var param = this.loadTagParam('gravity');
      this._gravity        = param ? +param : actGravity;
      this._lift           = this.loadTagParam('lift') || false;

    }
  };


  // フレーム更新
  var _Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function() {
    if (this._carried) {
      this._realX = $gamePlayer._realX;
      this._realY = $gamePlayer._realY - $gamePlayer._collideH - 0.001;
      this._x = Math.floor(this._realX);
      this._y = Math.floor(this._realY);
    } else {
      if (this.isLocking()) {
        this.updateLock();
      } else {
        _Game_Event_update.call(this);
        if (this._repopCount > 0) this.updateRepop();
      }
     
    }
  };

  // 摩擦の処理
  Game_Event.prototype.updateFriction = function() {
    Game_Character.prototype.updateFriction.call(this);
    if (!this.isMoving() && this._vx != 0) {
      if (!this.isDashing()) {
        var n = this.isSwimming() ? this._swimSpeed : this._moveSpeed;
        if (this._vx < -n) {
          this._vx = Math.min(this._vx + 0.005, -n);
        }
        if (this._vx > n) {
          this._vx = Math.max(this._vx - 0.005, n);
        }
      }
      if (this.isLanding()) {
        var n = actFriction;
        switch (this._landingRegion) {

        case actRoughFloorRegion:
          if (Math.abs(this._vx) > this._moveSpeed / 2) {
            this._vx = this._vx > 0 ? this._moveSpeed / 2 : -this._moveSpeed / 2;
          }
          break;
        case actMarshFloorRegion:
          this._vx = 0;
          return;
        }
        if (this._vx > 0) {
          this._vx = Math.max(this._vx - n, 0);
        } else {
          this._vx = Math.min(this._vx + n, 0);
        }
      }
    }
  };

  // リポップカウントの処理
  Game_Event.prototype.updateRepop = function() {
    this._repopCount--;
    if (this._repopCount === 0) {
      var key = [$gameMap.mapId(), this._eventId, this._deadSelfSwitch];
      if ($gameSelfSwitches.value(key)) {
        $gameSelfSwitches.setValue(key, false);
        this.refresh();
        this.requestAppear();
      }
    }
  };

  
  // 泳ぎ状態の更新
  Game_Event.prototype.updateSwiming = function() {
    Game_Character.prototype.updateSwiming.call(this);
    if (actUseEventSeSwim) {
      var origin_volume = actSeSwim.volume;
      var volume = Math.floor(origin_volume * ((15 - this.distFromCharacter($gamePlayer))) / 15);
      var se = {};
      se.name = actSeSwim.name;
      se.volume = Math.min(Math.max(volume, 0), 100);
      se.pitch = actSeSwim.pitch;
      if (this._realX < $gamePlayer._realX) {
        se.pan = Math.max(Math.floor((this._realX - $gamePlayer._realX) * 10, -100));
      } else {
        se.pan = Math.min(Math.floor((this._realX - $gamePlayer._realX) * 10, 100));
      }
      AudioManager.playSe(se);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  // イベントの位置変更
  Game_Interpreter.prototype.command203 = function() {
    var character = this.character(this._params[0]);
    if (character) {
      if (this._params[1] === 0) {  // Direct designation
        character.locate(this._params[2] + 0.5, this._params[3] + 1);
      } else if (this._params[1] === 1) {  // Designation with variables
        var x = $gameVariables.value(this._params[2] + 0.5);
        var y = $gameVariables.value(this._params[3] + 1);
        character.locate(x, y);
      } else {  // Exchange with another event
        var character2 = this.character(this._params[2]);
        if (character2) character.swap(character2);
      }
      if (this._params[4] > 0) character.setDirection(this._params[4]);
    }
    return true;
  };


  //-----------------------------------------------------------------------------
  

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
    case 'blink':
      this.startBlink();
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

  // 点滅エフェクトの開始
  Sprite_Character.prototype.startBlink = function() {
    this._effectDuration = this._character._invincibleTime;
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
      case 'blink':
        this.updateBlink();
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

  // 点滅エフェクトの更新
  Sprite_Character.prototype.updateBlink = function() {
    this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
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
 
  //-----------------------------------------------------------------------------
  // Sprite_MapPopup
  //


  //-----------------------------------------------------------------------------
  
  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);

  };



  // 飛行船の影の作成
  Spriteset_Map.prototype.createShadow = function() {
  };

  // 飛行船の影の更新
  Spriteset_Map.prototype.updateShadow = function() {
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable
  //

  var _Window_Selectable_isOkTriggered = Window_Selectable.prototype.isOkTriggered;
  Window_Selectable.prototype.isOkTriggered = function() {
    return _Window_Selectable_isOkTriggered.call(this);
  };

  var _Window_Selectable_isCancelTriggered = Window_Selectable.prototype.isCancelTriggered;
  Window_Selectable.prototype.isCancelTriggered = function() {
    return _Window_Selectable_isCancelTriggered.call(this) ||
           (actJumpToCancel && Input.isRepeated('jump'));
  };

  //-----------------------------------------------------------------------------
  // Window_Option
  //

  var _Window_Option_makeCommandList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    _Window_Option_makeCommandList.call(this);
    if (padConfigCommand) this.addCommand(padConfigCommand, 'padConfig');
    // 常にダッシュは不要なので削除してしまう。
    for (var i = 0; i < this._list.length; i++) {
      if (this._list[i].symbol === 'alwaysDash') {
        this._list.splice(i, 1);
        break;
      }
    }
  };

  var _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    if (symbol === 'padConfig') return '';
    return _Window_Options_statusText.call(this, index);
  };

  Window_Options.prototype.isPadSymbol = function(symbol) {
    return symbol.contains('padButton');
  };

  var _Window_Options_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol === 'padConfig') {
      this.playOkSound();
      this.updateInputData();
      this.deactivate();
      this.callHandler('padConfig');
    } else {
      _Window_Options_processOk.call(this);
    }
  };

  var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
  Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol !== 'padConfig') {
      _Window_Options_cursorRight.call(this, wrap);
    }
  };

  var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
  Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol !== 'padConfig') {
      _Window_Options_cursorLeft.call(this, wrap);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_PadOptions
  //

  function Window_PadOptions() {
    this.initialize.apply(this, arguments);
  }

  Window_PadOptions.prototype = Object.create(Window_Options.prototype);
  Window_PadOptions.prototype.constructor = Window_PadOptions;

  Window_PadOptions.prototype.initialize = function() {
    Window_Options.prototype.initialize.call(this, 0, 0);
    this.hide();
    this.deactivate();
  };

  Window_PadOptions.prototype.makeCommandList = function() {
    for (var i = 1; i <= 12; i++) {
      this.addCommand('パッドボタン' + i, 'padButton' + i);
    }
  };

  Window_PadOptions.prototype.statusWidth = function() {
    return 120;
  };

  Window_PadOptions.prototype.statusText = function(index) {
    var value = this.getConfigValue(index);
    return value ? padButtonNames[padButtons.indexOf(value)] : '';
  };

  Window_PadOptions.prototype.processOk = function() {
    var index = this.index();
    var value = this.getConfigValue(index);
    value = padButtons.indexOf(value);
    value = (value + 1) % padButtons.length;
    this.changeValue(index, padButtons[value]);
  };

  Window_PadOptions.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var value = this.getConfigValue(index);
    value = padButtons.indexOf(value);
    value = (value + 1).clamp(0, padButtons.length - 1);
    this.changeValue(index, padButtons[value]);
  };

  Window_PadOptions.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var value = this.getConfigValue(index);
    value = padButtons.indexOf(value);
    value = (value - 1).clamp(0, padButtons.length - 1);
    this.changeValue(index, padButtons[value]);
  };

  Window_PadOptions.prototype.changeValue = function(index, value) {
    var lastValue = this.getConfigValue(index);
    if (lastValue !== value) {
      this.setConfigValue(index, value);
      this.redrawItem(index);
      SoundManager.playCursor();
    }
  };

  Window_PadOptions.prototype.getConfigValue = function(index) {
    return ConfigManager.getPadButton(index);
  };

  Window_PadOptions.prototype.setConfigValue = function(index, value) {
    ConfigManager.setPadButton(index, value);
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    $gamePlayer.refresh();
  };

  Scene_Base.prototype.checkGameover = function() {
  };

  Scene_Map.prototype.processMapTouch = function() {
  };

  //-----------------------------------------------------------------------------
  // Scene_Options
  //

  var _Scene_Options_create = Scene_Options.prototype.create;
  Scene_Options.prototype.create = function() {
    _Scene_Options_create.call(this);
    this.createPadOptionsWindow();
  };
  
  var _Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
  Scene_Options.prototype.createOptionsWindow = function() {
    _Scene_Options_createOptionsWindow.call(this);
    this._optionsWindow.setHandler('padConfig', this.onPadConfig.bind(this));
  };
  
  Scene_Options.prototype.createPadOptionsWindow = function() {
    this._padOptionsWindow = new Window_PadOptions();
    this._padOptionsWindow.setHandler('cancel', this.cancelPadConfig.bind(this));
    this.addWindow(this._padOptionsWindow);
  };
  
  Scene_Options.prototype.onPadConfig = function() {
    this._optionsWindow.hide();
    this._padOptionsWindow.show();
    this._padOptionsWindow.activate();
  };
  
  Scene_Options.prototype.cancelPadConfig = function() {
    this._padOptionsWindow.hide();
    this._optionsWindow.show();
    this._optionsWindow.activate();
  };

})();
