from passlib.hash import bcrypt
from getpass import getpass

# Load dotenv file 
import dotenv 
from dotenv import dotenv_values
config = dotenv_values(".env")

# Read value from dotenv file
# print(config["KEY"])

# print(bcrypt.setting_kwds)
# ('salt', 'rounds', 'ident', 'truncate_error')
# print(bcrypt.default_rounds)
# 12

hasher = bcrypt.using(rounds=14)  # Make bcrypt take longer (more secure)

def main():
    print("Welcome to the setup program for the digitech-website-2022 app.")
    print("""
    1. Run all options 
    2. Set only the MySQL username and password that the webapp uses  
    3. Set only the admin username and password for the webapp admin panel
    4. Quit""")
    choice = input(" > ")

    if choice == "4":
        exit()

    if choice == "1" or choice == "2":
        print("Enter MySQL username and password")
        set_user_and_pass("MYSQL")
        if choice == "2":
            exit()
    
    print("Enter admin username and password")
    set_user_and_pass("WEBAPP")


def set_user_and_pass(option):
    username = input("Username: ")
    password = getpass()

    hashed_password = hasher.hash(password)
    # $2b$13$H9.qdcodBFCYOWDVMrjx/uT.fbKzYloMYD7Hj2ItDmEOnX5lw.BX.
    # \__/\/ \____________________/\_____________________________/
    # Alg Rounds  Salt (22 char)            Hash (31 char)

    dotenv.set_key(".env", option + "_USERNAME", username)
    dotenv.set_key(".env", option + "_PASSWORD", hashed_password)

    # print(hasher.verify(password, hashed_password))
    # True
    # print(hasher.verify("not-the-password", hashed_password))
    # False
    
if __name__ == '__main__':
    main()