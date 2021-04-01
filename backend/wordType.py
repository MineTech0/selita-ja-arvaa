import json
try:
    with open('data.json', 'r') as fp:
        data = json.load(fp)
        print(len(data['words']), 'sanaa löydetty')

except IOError:
    print('File not found, will create a new one.')
    data = {}
    data['words'] = []


print('Ala kirjoittaa sanoja(Enter lopettaakseen)\n')
while True:
    word = input(':').lower()
    if not word:
        break
    if(word in data['words']):
        print('sana jo listalla')
    else:
        data['words'].append(str(word))


with open('data.json', 'w', encoding='utf-8') as outfile:
    json.dump(data, outfile, ensure_ascii=False)
print('Sanat tallenntetu')