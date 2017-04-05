STATUS REPORT FOR WEEK 1

(1) Accomplished this week:

Created formula to estimate similarity between songs: 

	adjusted BPM = BPM/200 (if BPM > 200, adjBPM = 1)

	This is to place the BPM value within the same range as the energy, danceability, and valence values.

	similarity = .25(1 - difference in adjusted BPM) + .25(1 - difference in energy) + .25(1 - difference in danceability) + .25(1 - difference in valence)

	similarity will be a value between 0 and 1 with 1 being the most simmilar and 0 being the least.

(2) Challenges faced this week:

Working as a team using git and GitHub

Understanding Bootstrap and getting a grasp of the front-end framework.

(3) Goals for next week:

Implement requests to the Spotify API for audio features of a particular track (Tempo, Energy, Danceability, etc.) This will require getting an an authorisation token from the web api using client credentials.