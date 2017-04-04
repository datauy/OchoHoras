angular.module('app')
	.factory(
		"SideNavService",
		[
			function(){
				var open;
				var close;
				var select;

				return {
					onOpen : function(fn){
						open = fn;
					},
					onClose : function(fn){
						close = fn;
					},
					onSelect : function(fn){
						select = fn;
					},
					openNav : function(){
						open && open();
					},
					closeNav : function(){
						close && close();
					},
					select : function(key){
						select && select(key);
					}

				}
						
			}
		]
);