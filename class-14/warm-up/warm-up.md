# Warm-Up Exercise
This code sample is written in Java. Read through the code and determine the output for each function.

```
public class Locate {
    public static void main(String[] args) {
        int x = 5;
        int y = 5;

        int treeX = (int) Math.floor(10 * Math.random());
        int treeY = (int) Math.floor(10 * Math.random());

        System.out.println("You're standing in the middle of a forest.");
        System.out.println("Try to find a tree.");
        System.out.println();

        Scanner input = new Scanner(System.in);

        boolean isRunning = true;
        while (isRunning) {
            System.out.print("enter movement (north, east, south, west): ");
            String direction = input.nextLine().toLowerCase();

            if (isNorth(direction)) {
                y--;
            } else if (isEast(direction)) {
                x++;
            } else if (isSouth(direction)) {
                y++;
            } else if (isWest(direction)) {
                x--;
            } else {
                System.out.println("I don't understand.");
            }
            System.out.println("You are at " + x + " " + y);

            int distance = distance(x, y, treeX, treeY);
            if (distance < 2) {
                System.out.println("HOT");
            } else if (distance < 5) {
                System.out.println("warm");
            } else if (distance < 7) {
                System.out.println("cold");
            } else {
                System.out.println("FREEZING");
            }

            if (x == treeX && y == treeY) {
                isRunning = false;
                System.out.println("You found the tree!");
            }
        }
    }

    public static boolean isNorth(String input) {
        return input.equals("north") || input.equals("up") || input.equals("w");
    }

    public static boolean isEast(String input) {
        return input.equals("east") || input.equals("right") || input.equals("d");
    }

    public static boolean isSouth(String input) {
        return input.equals("south") || input.equals("down") || input.equals("s");
    }

    public static boolean isWest(String input) {
        return input.equals("west") || input.equals("left") || input.equals("a");
    }

    public static int distance(int x1, int y1, int x2, int y2) {
        int dx = Math.abs(x1 - x2);
        int dy = Math.abs(y1 - y2);
        return dx + dy;
    }
}
```
