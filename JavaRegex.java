import java.util.Scanner;
import java.util.regex.*;

public class JavaRegex {
    public static void main(String[] arg){
        Scanner sc = new Scanner(System.in);
        JavaRegex jr = new JavaRegex();
        
        String pattern = "^\\d[$]{1}[#]{1}[0-9,]*[0-9]$";
        String input = "2$#1,2";
        System.out.println(jr.match(pattern, input));
    }
    
    private boolean match(String pattern, String input){
        Pattern ptrn = Pattern.compile(pattern);
        Matcher matcher = ptrn.matcher(input);
        return matcher.matches();
    }
    
}
