function isZint(s){//是否为正整数
    var re = /^[0-9]+$/ ;
    return re.test(s)
} 

function validate(num){
 
var reg = /^\d+(?=\.{0,1}\d+$|$)/
  if(reg.test(num)) return true;
  return false ;  
} 

export{
	isZint,
	validate
}