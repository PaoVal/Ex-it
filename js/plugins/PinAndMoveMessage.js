/*:
 *
 * @plugindesc Pin Windows / Move Windows
 * @author Jake Jilg "mogwai"
 * 
 * version 0.3
 
Add these text to a game message. 

Add parameter
\[x:n y:n] to position x,y window/text in a custom postion

or use parameter
\[x:n y:n x2:n y2:n s:n] to move from x,y to x2,y2 at the speed of s

pin/unpin parameters

\[pinAs:n] The message becomes a picture with the ID of n

\[unpin:n,n,n] All these pinned message pictures will erase

(unpin is not needed if you use move picture eventing)

 */

// look for signs and...
(function(alias){
	Game_Message.prototype.add = function(){
		var pe = this._movement || {};
		var pn = this._pinning || {};
		
		arguments[0] = arguments[0].replace(
		/\\\[(x:(\d+?) y:(\d+?) ?)?(x2:(\d+?) y2:(\d+?) s:(\d+?))?\]/g,
		function(m1, m2, x, y, m3, x2, y2, s){
			pe.x = x !== undefined ? parseInt(x) : false;
			pe.y = y !== undefined ? parseInt(y) : false;
			pe.x2 = x2 !== undefined ?
			   parseInt(x2) : false;
			pe.y2 = y2 !== undefined ?
			   parseInt(y2) : false;
			pe.s = s !== undefined ? parseInt(s) : 5;
			return "\x99";
		});
		
		arguments[0] = arguments[0].replace(
		/\\\[(u?n?pinA?s?):([\d,]+)\]/g,
		function(m, pin, id){
			if(pin === "unpin"){
				pn._next2unpin = id.split(",");
			}
			if(pin === "pinAs"){
				pn._next2pin = id.split(",")[0];
			}
			return "";
		});
		alias.apply(this, arguments);
	};
})(Game_Message.prototype.add);

// place the message and...
(function(alias){
	Window_Message.prototype.updatePlacement = function(){
		alias.apply(this, arguments);
		var pe = $gameMessage._movement || {};
		if(pe.x !== false && pe.y !== false){
			this.x = pe.x;
			this.y = pe.y;
		}
	};
})(Window_Message.prototype.updatePlacement);

// found a moving sign so...
(function(alias){
	Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
	   if(text === "\x99"){
		   arguments[0] = "";
		   $gameMessage._isMoving = true;
	   }
	   alias.apply(this, arguments);
	};
})(Bitmap.prototype._drawTextBody);

// ...move the message and...
(function(alias){
	Game_Map.prototype.update = function(sceneActive){
		alias.apply(this, arguments);
		if(
			$gameMessage._isMoving    !==   undefined  &&
			$gameMessage._isMoving    ===   true       &&
			$gameMessage._movement    !==   undefined  &&
			$gameMessage._movement.x2 !==   false      &&
			$gameMessage._movement.y2 !==   false      &&
			$gameMessage._movement.s  !==   false
		){
			var msg = SceneManager._scene._windowLayer.children[0];
			var dst = $gameMessage._movement;
			$gameMessage._isMoving = msg.x !== dst.x2 || msg.y !== dst.y2;
			if($gameMessage._isMoving){
				angle = Math.atan2(dst.y2 - msg.y, dst.x2 - msg.x);
				var sX = dst.s * Math.cos(angle);
				var sY = dst.s * Math.sin(angle);
				msg.x = Math.abs(dst.x2 + sX) > Math.abs(msg.x + sX) ? msg.x + sX : dst.x2;
				msg.y = Math.abs(dst.y2 + sY) > Math.abs(msg.y + sY) ? msg.y + sY : dst.y2;
			}
		}
	};
})(Game_Map.prototype.update);

// but our picture isn't really a picture...
(function(alias){
	ImageManager.loadPicture = function(filename, hue) {
		if(filename.match(/^data:image\/png;base64,/) !== null){
			return this.loadNormalBitmap(filename, hue);
		}
		return alias.apply(this, arguments);
	};
})(ImageManager.loadPicture);

// it turns out Window_Layer does not always sit at 0
(function(alias){
	Scene_Map.prototype.createMessageWindow = function() {
		alias.apply(this, arguments);
		if($gameMessage !== undefined)
			$gameMessage._window = this._messageWindow;
	};
})(Scene_Map.prototype.createMessageWindow);

// ...pin or unpin the message, reset and DONE!
(function(alias){
	Game_Message.prototype.clear = function(){
		this._pinning = this._pinning || {};
		var pn = this._pinning;
		if(pn._next2pin !== undefined){
			
			var msg = $gameMessage._window||SceneManager._scene._windowLayer.children[0];
			var renderTexture = msg._windowSpriteContainer;
				renderTexture.renderCanvas(Graphics._renderer);
			console.log(renderTexture);
			
			var canvas = null;
			if (Graphics.isWebGL()) {
				canvas = Graphics._renderer.extract.canvas(renderTexture);
			} else {
				if (renderTexture.baseTexture == undefined || renderTexture.baseTexture == null) {
 	            	window.location.reload();
 	            }
 	            else {
 	            	canvas = renderTexture.baseTexture._canvasRenderTarget.canvas;
 	            }
			}
			if(canvas !== null){
				var ctx = canvas.getContext("2d");
				ctx.drawImage(msg.contents._canvas, msg.padding, msg.padding);
				$gameScreen.showPicture(
					this._pinning._next2pin,       // pictureId
					canvas.toDataURL("image/png"),// name
					0,                           // origin
					msg.x,                      // x
					msg.y,                     // y
                    100,                      // scaleX
                    100,                     // scaleY
                    255,                    // opacity
                    0                      // blendMode
				);
			}
			delete this._pinning._next2pin;
		}
		if(pn._next2unpin !== undefined){
			for(var i = 0; i < pn._next2unpin.length; i++){
				$gameScreen.erasePicture(pn._next2unpin[i]);
			}
			delete this._pinning._next2unpin;
		}
		alias.apply(this, arguments);
		this._isMoving = false;
		this._movement = {
			x: false,
			y: false,
			x2: false,
			y2: false,
			s: 5
		};
	};
})(Game_Message.prototype.clear);