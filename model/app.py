from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import pandas as pd
import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
lemma = WordNetLemmatizer()

from nltk.tokenize import word_tokenize

le = pickle.load(open('labelEncoder.pkl','rb'))
classifier = pickle.load(open('classifier.pkl','rb'))
vectoriser = pickle.load(open('vectoriser.pkl','rb'))


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

import string
def remove_punctuation(text):
    translator = str.maketrans('', '', string.punctuation)
    return text.translate(translator)


def preprocessing(sentence):
    
    #remove username
    sentence = re.sub(r"@(\w+)", "", sentence)
    
    #remove any urls
    sentence = re.sub(r"https?://\S+", "", sentence)
    
    #remove lagging spaces in b/w
    sentence = re.sub(r"\s{2,}", " ", sentence)
    
    #remove punctuation
    sentence = remove_punctuation(sentence)
    
    #stopwords
    stop_words = set(stopwords.words("english"))
    
    #split into words
    word_tokens = word_tokenize(sentence)
    
    #remove stopwords
    words = [word for word in word_tokens if word not in stop_words]
    
    #lemmatize words    
    res=[]
    for word in words:
       res.append(lemma.lemmatize(word,pos='v'))
    words=res
    
    #join thw words to form the final sentence
    sentence = " ".join(words)
    
    return sentence.lower()

@app.route('/sentiment', methods=['POST'])
def sentiment():
    try:
        data = request.get_json()
        text = data['text']
        
        print('raw text ', text )
        
        pre_text = preprocessing(text)
        
        print('processed text ', pre_text)
        
        mat = vectoriser.transform([text]).toarray()
        
        pred = classifier.predict(mat)
        
        res = le.inverse_transform(pred)[0]
        print(res)
        
        return jsonify(res)
    except:
        return jsonify('Error occurred while processing the request')
    
    

if __name__ == '__main__':
    app.run(debug=True)