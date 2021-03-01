# Warm-Up Exercise
This code sample is written in C#. Read through the code and determine the output for this function.

```
static void Main(String[] args)
  {
    int[] arr = {10, 7, 3, 1, 9, 7, 4, 3};
    Console.Write("Initial Array : ");
    Console.WriteLine(String.Join(" ", arr));
    Sort(arr);
  }

  static void Sort(int[] arr)
  {
    for (int i = 0; i < arr.Length; i++)
    {
      for (int j = 0; j < arr.Length - i - 1; j++)
      {
        if (arr[j] > arr[j + 1])
        {
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }

      Console.Write("After pass " + i + "  : ");
      Console.WriteLine(String.Join(" ", arr));
    }
  }
```
