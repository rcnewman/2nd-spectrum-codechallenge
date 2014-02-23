Coding Challenge
==========================

Write a program that predicts the likelihood that a given shot will go in, given the shot data from the
beginning of the 2006 season through some given point in time. Provide an evaluation, and show how the accuracy 
changes as you receive more data as time goes forward.

Written in NodeJS.

To start program, enter "node app.js" into commandline of root directory. Note: it may take some time to load all the csv files into memory.

In a browser, navigate to http://localhost:8000

Select team, player, and other options, when ready press the "Calculate Percentage" button to show the likelihood 
that a given shot will go in.

X and Y Coordinates do not affect query, more details on why in the Improvements section.

The program first loads all CSV data into an array of Shot Objects. A shot object contains information like shooter Name, team, date of game, period, whether it is a free throw or a shot, shot type, and more. Currently some of the data loaded is unused.
From this array, all the teams are found and placed into a dropdown menu. Upon selection of a team by the user, the program finds all players who are members of the team. Upon selection of the player, the program finds all the shot types which the player took.
The user can then choose whether to filter by free throw or shot, by shot type, and by date. The date field filters out shots taken after the selected date, in order to show how shot likelihood changes as time goes by.
After pushing the calculate percentage button, the program filters all loaded data based upon the selected fields, and returns a percentage likelihood, which is calculated by (Number of Shots Made) / (Total number of shots taken)


# Improvements
- One improvement would be to load data as needed. Currently, the program loads all data immediately, which is very memory intensive. For example, if you only need data up until 2008, then it would avoid loading in data after 2008.
- Cache certain results. Each time a team is selected, it must filter the whole array of loaded data to find player names. In order to improved performance, if the player rosters were cached, then it would save the time of filtering through the large array.
- Make location data relevant. With the current program, if I uncommented the lines in filter.js, the filter by location only selects shots which were made at that exact position selected. As it is, the results from this data does not seem very relevant. To improve upon this, I would try filtering for clusters of locations, in order to show a circular region of shots. Another way I would improve would be to cluster based on court regions, such as beyond the 3-point line, under the net, left or right side of the court, etc. I believe that these would show information that is more useful.
