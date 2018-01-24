exports.install = function(Vue, options){
	Vue.prototype.test1 = function(){
		alert(1);
	};

	Vue.prototype.rd = function(f, t){
		return Math.floor(Math.random() * t + f);
	};
};