#Este arquivo faz parte do programa de sorteio de acólitos, por Mário e Данецк
import os
import configparser
from tkinter import *
from tkinter import messagebox

config = configparser.ConfigParser()
janela = Tk()
janela.title("Gerenciador de listas")

# Método de fim de Execução
def boa_noite():
    lista_acolitos = open("Lista_de_Acolitos.js","a", -1, "utf-8")
    lista_acolitos.writelines("nome = [\"" + "\",\"".join(acolitos) + "\"]")
    lista_acolitos.close()
    listadat = open("lista-de-acolitos.dat","a", -1, "utf-8")
    listadat.writelines("[acolitos]\n")
    listadat.writelines("nomes = " + "+".join(acolitos))
    janela.destroy()

#Se encontrar uma lista ini, iniciar no modo editor, caso contrário, iniciar no modo criador
try:
    listadat = open("lista-de-acolitos.dat","r", -1, "utf-8")
    program_mode = 1
except:
    program_mode = 0
# Ambos os modos deixam uma lista "acolitos" com todos os nomes no fim
## Modo criador
if program_mode == 0:
    acolitos = []
    # Métodos
    def listademo():
        lista.config(text="Acólitos: " + ", ".join(acolitos))
    def adicionar():
        nome = caixa_texto.get()
        acolitos.append(nome)
        caixa_texto.delete(0, END)
        listademo()
    def encerrar():
        try:
            os.remove("Lista_de_Acolitos.js")
        except:
            pass
        boa_noite()
    # Itens da Janela
    texto_subtitulo = Label(janela, text="Modo Criador")
    texto_instruc = Label(janela, text="Escreva o nome de um acólito para adicionar à lista")
    caixa_texto = Entry(janela, width=50)
    btn_adicionar = Button(janela, text="Adicionar", command=adicionar)
    btn_encerrar = Button(janela, text="Concluído", command=encerrar)
    lista = Label(janela, text="Acólitos: " + ", ".join(acolitos), wraplength=400, justify="center")
    # Posições
    texto_subtitulo.grid(row=0, column=1)
    texto_instruc.grid(row=1, column=1)
    caixa_texto.grid(row=2, column=1)
    btn_adicionar.grid(row=3, column=0, padx=2, pady=2)
    btn_encerrar.grid(row=3, column=2, padx=2, pady=2)
    lista.grid(row=4, column=0, columnspan=3, pady=2)
    # Keybinds
    janela.bind("<Return>", lambda event:adicionar())
    
    messagebox.showinfo(title="Aviso", message="Lista .dat não encontrada, iniciando no modo criador")
    janela.mainloop()
## Modo editor
elif program_mode == 1:
    config.read("lista-de-acolitos.dat", encoding="utf-8")
    acolitos = config.get("acolitos", "nomes").split("+")
    # Métodos
    def listademo():
        lista.config(text="Acólitos: " + ", ".join(acolitos))
    def adicionar():
        nome = caixa_texto.get()
        acolitos.append(nome)
        caixa_texto.delete(0, END)
        listademo()
    def remover():
        nome = caixa_texto.get()
        try:
            acolitos.remove(nome)
        except:
            messagebox.showerror(title="Erro", message="Nome \"" + nome + "\" não encontrado na lista")
        caixa_texto.delete(0, END)
        listademo()
    def encerrar():
        listadat.close()
        os.remove("Lista_de_Acolitos.js")
        os.remove("lista-de-acolitos.dat")
        boa_noite()
    # Itens da Janela
    texto_subtitulo = Label(janela, text="Modo Editor")
    texto_instruc = Label(janela, text="Escreva o nome de um acólito")
    caixa_texto = Entry(janela, width=50)
    separador = Label(janela, text=" ")
    btn_adicionar = Button(janela, text="Adicionar", command=adicionar)
    btn_remover = Button(janela, text="Remover", command=remover)
    btn_encerrar = Button(janela, text="Concluído", command=encerrar)
    lista = Label(janela, text="Acólitos: " + ", ".join(acolitos), wraplength=400, justify="center")
    # Posições
    texto_subtitulo.grid(row=0, column=1)
    texto_instruc.grid(row=1, column=1)
    caixa_texto.grid(row=2, column=1)
    separador.grid(row=3, column=1)
    btn_adicionar.grid(row=4, column=0)
    btn_remover.grid(row=4, column=1)
    btn_encerrar.grid(row=4, column=2)
    lista.grid(row=5, column=0, columnspan=3, pady=2)
    # Keybinds
    janela.bind("<Return>", lambda event:adicionar())

    messagebox.showinfo(title="Aviso", message="Lista .dat encontrada, iniciando no modo editor")
    janela.mainloop()