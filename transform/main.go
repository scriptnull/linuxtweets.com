/*
  Utility tool for transforming data in ../data to
*/

package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"path"
	"strings"
)

const (
	oEmbedEndpoint string = "https://publish.twitter.com/oembed"
)

type twitterOEmbed struct {
	HTML string `json:"html"`
	URL  string `json:"url"`
}

func main() {

	// tweets.txt is the file that contains link to all curated linux tweets
	// It will always be present at ../data folder
	// Hence hard coding it
	fmt.Println("Reading tweets.txt")
	wd, err := os.Getwd()
	if err != nil {
		log.Fatalf("Error while getting current directory = %v", err)
	}
	tweetDataPath := path.Join(wd, "../data", "tweets.txt")
	tweetData, err := ioutil.ReadFile(tweetDataPath)
	if err != nil {
		log.Fatalf("Error while reading %s = %v", tweetDataPath, err)
	}

	// Convert URLs in txt file to a Go array
	fmt.Println("Getting Tweets from Twitter")
	tweetURLs := strings.Split(string(tweetData), "\n")
	tweets := []twitterOEmbed{}
	for _, URL := range tweetURLs {
		embed, tweetErr := getTweetEmbed(URL)
		if tweetErr != nil {
			log.Fatalf("Error fetching tweet for %s = %v", URL, tweetErr)
		}
		tweets = append(tweets, *embed)
	}

	// dump tweets to json file
	fmt.Println("Dumping tweets to ../data/tweets.json")
	tweetsJSON, err := json.Marshal(tweets)
	if err != nil {
		log.Fatalf("Error marshalling tweet JSON = %v", err)
	}
	ioutil.WriteFile("../data/tweets.json", tweetsJSON, 0777)
}

func getTweetEmbed(tweetURL string) (*twitterOEmbed, error) {
	resp, err := http.Get(fmt.Sprintf("%s?url=%s&omit_script=true", oEmbedEndpoint, url.QueryEscape(tweetURL)))
	if err != nil {
		return nil, err
	}
	decoder := json.NewDecoder(resp.Body)
	embed := &twitterOEmbed{}
	err = decoder.Decode(embed)
	if err != nil {
		return nil, err
	}
	return embed, nil
}
