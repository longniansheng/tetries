# tetries

俄罗斯方块

## 问题记录

### 重置方法gameData设置`DEFAULT_GAME_DATA`二维数组还原，state中的数值不会变化

经排查是初始化成功之后所有的gameData数据都是在`DEFAULT_GAME_DATA`这个对象上进行操作

尝试解决方案：

 1. 在重置方法中重新调用方法生成二维数组
 2. 写了个简单的二维数组拷贝方法，保证初始化和重置的时候是`DEFAULT_GAME_DATA`的拷贝,
 3. 采用immer库，使用不可变对象(下次改造)  
