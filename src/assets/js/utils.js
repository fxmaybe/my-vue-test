exports.install = function(Vue, options){
  Vue.prototype.test1 = function(){
    alert(1);
  };
};