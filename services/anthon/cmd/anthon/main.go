package main

import (
	"fmt"

	"github.com/nikodem-wrona/anthon/anthon/ai"
)

func main() {
	fmt.Println("Hello, World!")
	res, err := ai.GetPredictions()

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(res)
}
