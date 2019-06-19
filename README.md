# tetries

俄罗斯方块

## 问题记录

### 重置方法gameData设置`DEFAULT_GAME_DATA`二维数组还原，state中的数值不会变化

经排查是初始化成功之后所有的gameData数据都是在`DEFAULT_GAME_DATA`这个对象上进行操作

尝试解决方案：

 1. 在重置方法中重新调用方法生成二维数组
 2. 写了个简单的二维数组拷贝方法，保证初始化和重置的时候是`DEFAULT_GAME_DATA`的拷贝,
 3. 采用immer库，使用不可变对象(下次改造)  

### 游戏结束时useInterval方法没有结束

游戏结束之后就不需要在执行当前方块的下降方法，游戏开始时再重新触发。现在的解决方案是监听游戏结束的状态，如果已经结束将useInterval的回调函数置空。但是这个没有从根本上解决useInterval方法调用的问题
