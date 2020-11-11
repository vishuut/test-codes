class FindSubString {

	public static void main(String[] arg) {
		String str = "hello vishal";
		String subStr = "vishal";
		
		char[] strChar = str.toCharArray();
		char[] subStrChar = subStr.toCharArray();
		
		int strLen = str.length();
		int subStrLen = subStr.length();
		
		int startIndex = 0;
		int endIndex = 0;
		
		int foundFlag = 0;

		if(strLen >= subStrLen){
			for(int i = 0; i < strLen; i++){
				System.out.println(i);
				if((strLen - (i)) >= subStrLen){
					startIndex = i;
					int j=i;
					for(; j < strLen; j++){
						if(subStrChar[j] != strChar[j])
							break;
					}
					
					if(j == subStrLen) {
						foundFlag = 1;
						endIndex = j - 1;
						System.out.println("Sub-string found. Start index = " + startIndex + " end index = " + endIndex);
					}
				}else{
					System.out.println("Cannot find the substring inside the given string.");
					break;
				}
				if(foundFlag == 1) {
					break;
				}
			}
		}else{
			System.out.println("Length of string is smaller than the sub-string, so it cannot be found.");
		}
		
	}	
}