// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MovingScript extends cc.Component {

    _sprite: cc.Node;
    _canvas: cc.Node;
    _moving : boolean;
    _x : number;
    _y : number;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._sprite = this.node;
        this._canvas = this.node.parent;

        this._sprite.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this._canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this._canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this._canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onDestroy(){
        this._sprite.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this._canvas.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this._canvas.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this._canvas.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchStart(e: cc.Touch){
        this._moving = true;
        this._x = this._sprite.x;
        this._y = this._sprite.y;
    }

    onTouchEnd(e: cc.Touch){
        this._moving = false;
    }

    onTouchCancel(e: cc.Touch){
        this._moving = false;
    }

    onTouchMove(e: cc.Touch){
        if(!this._moving)return;

        this._x += e.getDelta().x;
        this._y += e.getDelta().y;
    }

    start () {

    }

    update (dt) {
        if(this._moving){
            this._sprite.x = this._x;
            this._sprite.y = this._y;
        }
    }
}
