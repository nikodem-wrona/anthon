import sys

from rich.console import Console

def main():
    # sys.argv[0] is the script name itself
    for i in range(1, len(sys.argv)):
        print(f"Argument {i} is: {sys.argv[i]}")
        
    console = Console()

    console.print([1, 2, 3])
    console.print("[blue underline]Looks like a link")
    console.print("FOO", style="white on blue")


if __name__ == "__main__":
    main()