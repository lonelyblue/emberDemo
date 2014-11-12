Todos.TodosController = Ember.ArrayController.extend({
	actions : {
		createTodo : function(){
			// Get the todo title set by the "New Todo" text field
			var title = this.get('newTitle');
			if(!title.trim()){
				return;
			}

			// Create the new Todo model
			var todo = this.get('store').createRecord('todo', {
				title : title,
				isCompleted : false
			});

			// Clear the "New Todo" text field
			this.set('newTitle', '');

			// Save the new model
			todo.save();
		},
		clearCompleted : function(){
			var completedRecords = this.filterBy('isCompleted', true);
			completedRecords.invoke('deleteRecord');
			completedRecords.invoke('save');
		}
	},
	/**
	 * @description 剩余todo数量
	 */
	remaining : function(){
		return this.filterBy('isCompleted', false).get('length');
	}.property('@each.isCompleted'),
	/**
	 * @description remaining属性的观察器(观察旧值)
	 */
	remainingChanged : function(){
		// The observer depends on remaining. Because observers
	    // are synchronous, when this function is called the value of remaining is
	    // not updated yet so this will log the old value of remaining
		console.log('old remain todo:' + this.get('remaining'));
	}.observes('remaining'),
	/**
	 * @description remaining属性的观察器
	 */
	 /*
	remainingChanged : function(){
		console.log('remain todo:' + this.get('remaining'));
	}.observes('remaining').on('init'),
	*/
	/**
	 * @description todo单数和复数词形控制
	 */
	inflection : function(){
		var remaining = this.get('remaining');
		return remaining === 1 ? 'todo' : 'todos';
	}.property('remaining'),
	/**
	 * @description 是否包含已完成的todo
	 */
	hasCompleted : function(){
		return this.get('completed') > 0
	}.property('completed'),
	/**
	 * @description 已完成的todo数量
	 */
	completed : function(){
		return this.filterBy('isCompleted', true).get('length');
	}.property('@each.isCompleted'),
	/**
	 * @description 所有todo已完成
	 */
	allAreDone : function(key, value){
		if(value === undefined){
			return !!this.get('length') && this.everyProperty('isCompleted', true);
		}else{
			this.setEach('isCompleted', value);
			this.invoke('save');
			return value;
		}
	}.property('@each.isCompleted')
});