import { MessageBox } from 'mint-ui';

module.exports = {
	data(){
		return {
			
		}
	},
	methods:{
		popBox(title,message,aFau){
			MessageBox.confirm(
				message,
				title,
				).then(aFau);
		}
	}
		
}