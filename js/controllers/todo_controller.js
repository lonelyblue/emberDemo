Todos.TodoController = Ember.ObjectController.extend({
	actions : {
		editTodo : function(){
			this.set('isEditing', true);
		},
		removeTodo : function(){
			var todo = this.get('model');
			todo.deleteRecord();
			todo.save();
		}
	},
	acceptChanges : function(){
		this.set('isEditing', false);

		if(Ember.isEmpty(this.get('model.title'))){
			this.send('removeTodo');
		}else{
			this.get('model').save();
		}
	},
	/**
	 * @description todo完成状态
	 */
	isCompleted : function(key, value){
		var model = this.get('model');

		if(value === undefined){
			// property being used as a getter
			return model.get('isCompleted');
		}else{
			// property being used as a setter
			model.set('isCompleted', value);
			model.save();
			return value;
		}
	}.property('model.isCompleted'),
	/**
	 * @description todo编辑状态, 默认不可编辑
	 */
	isEditing : false
});