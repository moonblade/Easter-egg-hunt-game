#!/usr/bin/env python
with open("secretRoom") as file:
	linum=0
	for line in file:
		linum+=1
		power=1
		total=0
		required = line[0:8].replace(' ','0').replace('x','1')
		# print(required, hex(int(required,2)))
		print("       .byte $"+'{:02x}'.format(int(required,2)).upper()+"                  ;"+line[0:8].upper())
