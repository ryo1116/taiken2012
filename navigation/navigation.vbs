Option Explicit

Dim objIE
Dim i
Dim intWidth
Dim intHeight
Dim intX
Dim intY

'�����ݒ�(�E�B���h�E�T�C�Y�A�\���ʒu�Ɏg�p)
intWidth = 320
intHeight = 480
intX = 100
intY = 100

'IE�I�u�W�F�N�g���쐬���܂�
Set objIE = CreateObject("InternetExplorer.Application")

'�E�B���h�E�̑傫����ύX���܂�
objIE.Width = intWidth
objIE.Height = intHeight

'�\���ʒu��ύX���܂�
objIE.Left = intX
objIE.Top = intY

'�X�e�[�^�X�o�[�ƃc�[���o�[���\���ɂ��܂�
objIE.Statusbar = False
objIE.AddressBar = False


'objIE.Navigate "http://www.yahoo.co.jp/"
objIE.Navigate "http://127.0.0.1:8080/taiken/navigation/navigation.html"



'�C���^�[�l�b�g�G�N�X�v���[����ʂ�\�����܂�
objIE.Visible = True

