import pandas as pd
import os #provides functions for interacting with the operating system
import numpy as np 
import pandas as pd
from matplotlib import pyplot as plt
import matplotlib.pyplot as plt
import seaborn as sns

def dummyvisual():
    return {
        "Inputs": {"BPM": 110,
                   "Energy": 9000,
                   "Loudness": -4},
        "Output": "Rap",
        "Comment": "Visualization data and calculations will go here"
    }

def getvisual(csv, type, variables, color = 'blue'):
    assert(type(csv) == str)
    assert(type(variables) == list)
    df = pd.read_csv(csv)
    filename = csv[:-4] + '_' + type + '.png'
    graph = None
    if type == 'hist':
        assert(len(variables) == 1)
        assert(variables[0] != None)
        #make a histogram with the x
        to_plot = df[variables[0]].values
        graph = sns.distplot(to_plot, color)
    elif type == 'scat':
        assert(len(variables) == 2 and variables[0] != None and variables[1] != None)
        graph = sns.scatterplot(x=variables[0], y=variables[1], data = df, color = color)
    elif type == 'lmplot':
        assert(len(variables) == 2 and variables[0] != None and variables[1] != None)
        #uses scatter + linear regression
        graph = sns.lmplot(x=variables[0], y=variables[1], data = df, color = color)
    elif type == 'pairplot':
        #uses all variables passed in variables
        graph = sns.pairplot(df[variables], plot_kws={'color':color})
    elif type == 'heatmap':
        #for finding coorelations
        coor = df[variables].cirr(method = 'pearson')
        cols = variables
        graph = sns.heatmap(coor, annot=True, 
                                  yticklabels=cols, 
                                  xticklabels=cols,
                                  annot_kws = {'size':24})
    else:
        assert(False)
    graph.savefig(filename)
    return filename


        