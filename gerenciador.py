#Este arquivo faz parte do programa de sorteio de acólitos, por Mário e Данецк
import os
import configparser
config = configparser.ConfigParser()
print("Gerador de Lista de Acólitos")
print("Utilize apenas caso ocorrer uma mudança na lista de acólitos!")
#Se encontrar uma lista ini, iniciar no modo editor, caso contrário, iniciar no modo criador
try:
    listadat = open("lista-de-acolitos.dat","r")
    print("Lista .dat encontrada, iniciando no modo editor.")
    program_mode = 1
except:
    print("Lista .dat não encontrada, iniciando no modo criador")
    program_mode = 0
# Ambos os modos deixam uma lista "acolitos" com todos os nomes no fim
#Modo criador
if program_mode == 0:
    acolitos = []
    while True:
        nome = str(input("Escreva o nome de um acólito, ou deixe em branco para parar: "))
        if nome == "":
            failsafe = str(input("Você tem certeza que deseja encerrar por aqui? S/N "))
            while failsafe.casefold() != "s" and failsafe.casefold() != "n":
                failsafe = str(input("Você tem certeza que deseja encerrar por aqui? S/N "))
            if failsafe.casefold() == "s":
                break
        else: 
            acolitos.append(nome)
#Modo editor
elif program_mode == 1:
    #config.read_file(open("lista-de-acolitos.dat"))
    config.read("lista-de-acolitos.dat")
    acolitos = config.get("acolitos", "nomes").split("+")
    while True:
        operation = str(input("Digite 1 para adicionar um nome, 2 para remover um nome, ou 3 para parar: "))
        if operation == "1":
            nome = str(input("Escreva um nome para adicionar: "))
            acolitos.append(nome)
        elif operation == "2":
            nome = str(input("Escreva um nome para remover: "))
            acolitos.remove(nome)
        elif operation == "3":
            listadat.close()
            os.remove("Lista_de_Acolitos.js")
            os.remove("lista-de-acolitos.dat")
            break
#Criar arquivos e escrever dados - fim de execução
lista_acolitos = open("Lista_de_Acolitos.js","a")
lista_acolitos.writelines("nome = [\"" + "\",\"".join(acolitos) + "\"]")
lista_acolitos.close()
listadat = open("lista-de-acolitos.dat","a")
listadat.writelines("[acolitos]\n")
listadat.writelines("nomes = " + "+".join(acolitos))