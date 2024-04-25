package ai

import (
	"io"
	"net/http"
)

func GetPredictions() (string, error) {
	client := &http.Client{}

	req, err := http.NewRequest("GET", "https://api.replicate.com/v1/predictions", nil)

	if err != nil {
		return "", err
	}

	req.Header.Add("Authorization", "Bearer")
	req.Header.Add("Content-Type", "application/json")

	resp, requestError := client.Do(req)

	if requestError != nil {
		return "", err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return "", err
	}

	return string(body), nil
}
